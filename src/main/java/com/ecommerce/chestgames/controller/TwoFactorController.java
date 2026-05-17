package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.entity.User;
import com.ecommerce.chestgames.repository.UserRepository;
import com.ecommerce.chestgames.security.CustomUserDetails;
import com.ecommerce.chestgames.service.AsyncEmailService;
import com.ecommerce.chestgames.service.EmailService;
import com.ecommerce.chestgames.service.EmailTemplateService;
import com.ecommerce.chestgames.service.TwoFactorService;
import com.ecommerce.chestgames.utils.CryptoUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/2fa")
@RequiredArgsConstructor
public class TwoFactorController {

    private final TwoFactorService twoFactorService;
    private final UserRepository userRepository;
    private final CryptoUtil cryptoUtil;
    private final EmailService emailService;
    private final EmailTemplateService emailTemplateService;
    private final AsyncEmailService asyncEmailService;

    // SETUP 2FA
    @PostMapping("/setup")
    public ResponseEntity<?> setup(@AuthenticationPrincipal CustomUserDetails userDetails) throws Exception {
        if (userDetails == null) {
            return ResponseEntity.status(401).body(Map.of("error", "User not authenticated"));
        }

        User user = userDetails.getUser();
        String secret = twoFactorService.generateSecret();

        user.setTwoFactorTempSecret(cryptoUtil.encrypt(secret));
        userRepository.save(user);

        String qr = twoFactorService.generateQR(user.getEmail(), secret);

        return ResponseEntity.ok(Map.of(
                "qr", qr,
                "secret", secret
        ));
    }

    // VERIFY 2FA
    @PostMapping("/verify")
    public ResponseEntity<?> verify(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam String code
    ) throws Exception {
        if (userDetails == null) {
            return ResponseEntity.status(401).body(Map.of("error", "User not authenticated"));
        }

        User user = userDetails.getUser();
        String secret = cryptoUtil.decrypt(user.getTwoFactorTempSecret());

        boolean valid = twoFactorService.verifyCode(secret, code);

        if (!valid) {
            return ResponseEntity.badRequest().body("Código inválido");
        }

        user.setTwoFactorEnabled(true);
        user.setTwoFactorSecret(user.getTwoFactorTempSecret());
        user.setTwoFactorTempSecret(null);

        userRepository.save(user);

        // Enviar email de confirmación de forma asíncrona (no bloquea la respuesta)
        asyncEmailService.send2FAConfirmationEmailAsync(user.getUsername(), user.getEmail());

        return ResponseEntity.ok("2FA activado correctamente");
    }

    // DISABLE 2FA
    @PostMapping("/disable")
    public ResponseEntity<?> disable(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam String code
    ) throws Exception {
        if (userDetails == null) {
            return ResponseEntity.status(401).body(Map.of("error", "User not authenticated"));
        }

        User user = userDetails.getUser();
        if (!user.isTwoFactorEnabled()) {
            return ResponseEntity.badRequest().body("2FA no está activo");
        }

        String secret = cryptoUtil.decrypt(user.getTwoFactorSecret());

        boolean valid = twoFactorService.verifyCode(secret, code);

        if (!valid) {
            return ResponseEntity.badRequest().body("Código inválido");
        }

        user.setTwoFactorEnabled(false);
        user.setTwoFactorSecret(null);

        userRepository.save(user);

        return ResponseEntity.ok("2FA desactivado");
    }

    // STATUS
    @GetMapping("/status")
    public ResponseEntity<?> status(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body(Map.of("error", "User not authenticated"));
        }

        User user = userDetails.getUser();
        return ResponseEntity.ok(Map.of(
                "enabled", user.isTwoFactorEnabled()
        ));
    }
}