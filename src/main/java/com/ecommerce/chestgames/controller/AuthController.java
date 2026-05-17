package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.dto.AuthResponse;
import com.ecommerce.chestgames.dto.CreateAdminRequest;
import com.ecommerce.chestgames.dto.ForgotPasswordRequest;
import com.ecommerce.chestgames.dto.LoginRequest;
import com.ecommerce.chestgames.dto.RegisterRequest;
import com.ecommerce.chestgames.dto.ResetPasswordRequest;
import com.ecommerce.chestgames.entity.Role;
import com.ecommerce.chestgames.entity.User;
import com.ecommerce.chestgames.repository.RoleRepository;
import com.ecommerce.chestgames.repository.UserRepository;
import com.ecommerce.chestgames.security.CustomUserDetails;
import com.ecommerce.chestgames.service.AsyncEmailService;
import com.ecommerce.chestgames.service.EmailService;
import com.ecommerce.chestgames.service.EmailTemplateService;
import com.ecommerce.chestgames.service.TwoFactorService;
import com.ecommerce.chestgames.utils.CryptoUtil;
import com.ecommerce.chestgames.utils.JwtUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final TwoFactorService twoFactorService;
    private final CryptoUtil cryptoUtil;
    private final EmailService emailService;
    private final EmailTemplateService emailTemplateService;
    private final AsyncEmailService asyncEmailService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body("El nombre de usuario ya existe.");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("El correo ya está registrado.");
        }

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Role not found"));

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.getRoles().add(userRole);

        userRepository.save(user);

        // Enviar email de bienvenida de forma asíncrona (no bloquea la respuesta)
        asyncEmailService.sendWelcomeEmailAsync(user.getUsername(), user.getEmail());

        CustomUserDetails userDetails = new CustomUserDetails(user);
        String token = jwtUtils.generateToken(userDetails);

        List<String> roles = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return ResponseEntity.ok(
                new AuthResponse(token, user.getUsername(), roles, user)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        String loginIdentifier = request.getEmail() != null && !request.getEmail().isBlank()
                ? request.getEmail()
                : request.getUsername();

        if (loginIdentifier == null || loginIdentifier.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        try {
            Authentication authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    loginIdentifier,
                                    request.getPassword()
                            )
                    );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User loggedUser = ((CustomUserDetails) userDetails).getUser();

            if (loggedUser.isTwoFactorEnabled()) {
                return ResponseEntity.ok(
                        new AuthResponse(null, userDetails.getUsername(),
                                userDetails.getAuthorities().stream()
                                        .map(GrantedAuthority::getAuthority)
                                        .toList(),
                                loggedUser, true)
                );
            }

            String token = jwtUtils.generateToken(userDetails);
            List<String> roles = userDetails.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();

            return ResponseEntity.ok(
                    new AuthResponse(token, userDetails.getUsername(), roles, loggedUser)
            );
        } catch (org.springframework.security.core.AuthenticationException ex) {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/login/verify")
    public ResponseEntity<?> verifyLogin2FA(@RequestBody LoginRequest request) {
        String loginIdentifier = request.getEmail() != null && !request.getEmail().isBlank()
                ? request.getEmail()
                : request.getUsername();

        if (loginIdentifier == null || loginIdentifier.isBlank() || request.getCode() == null || request.getCode().isBlank()) {
            return ResponseEntity.badRequest().body("Login identifier and 2FA code are required");
        }

        User user = userRepository.findByEmail(loginIdentifier)
                .or(() -> userRepository.findByUsername(loginIdentifier))
                .orElse(null);

        if (user == null || !user.isTwoFactorEnabled() || user.getTwoFactorSecret() == null) {
            return ResponseEntity.status(401).body("Usuario no autorizado o 2FA no activado");
        }

        try {
            String secret = cryptoUtil.decrypt(user.getTwoFactorSecret());
            boolean valid = twoFactorService.verifyCode(secret, request.getCode());

            if (!valid) {
                return ResponseEntity.status(401).body("Código inválido");
            }

            CustomUserDetails userDetails = new CustomUserDetails(user);
            String token = jwtUtils.generateToken(userDetails);
            List<String> roles = userDetails.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();

            return ResponseEntity.ok(
                    new AuthResponse(token, userDetails.getUsername(), roles, user)
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error verificando 2FA");
        }
    }

    @PostMapping("/create-admin")
    //@PreAuthorize("hasRole('ADMIN')") // Solo usuarios con ROLE_ADMIN pueden crear otros admins
    public ResponseEntity<?> createAdmin(@RequestBody @Valid CreateAdminRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        // Traer el rol ADMIN de la DB
        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                .orElseThrow(() -> new RuntimeException("Admin role not found"));

        User admin = new User();
        admin.setUsername(request.getUsername());
        admin.setEmail(request.getEmail());
        admin.setPassword(passwordEncoder.encode(request.getPassword()));
        admin.getRoles().add(adminRole);

        userRepository.save(admin);

        return ResponseEntity.ok("Admin created successfully");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            return ResponseEntity.badRequest().body("El correo es requerido");
        }

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            // Por seguridad, no revelamos si el email existe o no
            return ResponseEntity.ok("Si el correo existe, recibirás un enlace para restablecer tu contraseña");
        }

        // Generar token único
        String resetToken = UUID.randomUUID().toString();
        user.setResetPasswordToken(resetToken);
        user.setResetPasswordExpiry(LocalDateTime.now().plusHours(24));
        userRepository.save(user);

        // Construir enlace de reset (cambiar según tu URL frontend)
        String resetLink = "http://localhost:5173/reset-password?token=" + resetToken;

        // Enviar correo de forma asíncrona (no bloquea la respuesta)
        asyncEmailService.sendResetPasswordEmailAsync(user.getUsername(), user.getEmail(), resetLink);

        return ResponseEntity.ok("Si el correo existe, recibirás un enlace para restablecer tu contraseña");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        if (request.getToken() == null || request.getToken().isBlank() || 
            request.getNewPassword() == null || request.getNewPassword().isBlank()) {
            return ResponseEntity.badRequest().body("Token y contraseña son requeridos");
        }

        User user = userRepository.findByResetPasswordToken(request.getToken()).orElse(null);

        if (user == null) {
            return ResponseEntity.status(400).body("Token inválido o expirado");
        }

        // Verificar que el token no haya expirado
        if (user.getResetPasswordExpiry() == null || LocalDateTime.now().isAfter(user.getResetPasswordExpiry())) {
            return ResponseEntity.status(400).body("El enlace de recuperación ha expirado");
        }

        try {
            // Cambiar contraseña
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            user.setResetPasswordToken(null);
            user.setResetPasswordExpiry(null);
            userRepository.save(user);

            return ResponseEntity.ok("Contraseña restablecida exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al restablecer la contraseña");
        }
    }

}