package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.dto.ChangeEmailRequest;
import com.ecommerce.chestgames.dto.ChangePasswordRequest;
import com.ecommerce.chestgames.dto.DeleteAccountRequest;
import com.ecommerce.chestgames.dto.UserProfileResponse;
import com.ecommerce.chestgames.dto.UserProfileUpdateRequest;
import com.ecommerce.chestgames.entity.User;
import com.ecommerce.chestgames.repository.UserRepository;
import com.ecommerce.chestgames.security.CustomUserDetails;
import com.ecommerce.chestgames.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponse> getProfile(@AuthenticationPrincipal CustomUserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        UserProfileResponse response = mapToResponse(user);
        
        // Agregar headers de caché para mejorar performance
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CACHE_CONTROL, "private, max-age=300"); // 5 minutos
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(response);
    }

    @PutMapping("/profile")
    public UserProfileResponse updateProfile(@AuthenticationPrincipal CustomUserDetails userDetails,
                                             @RequestBody UserProfileUpdateRequest request) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        boolean usernameChanged = false;

        if (request.getUsername() != null && !request.getUsername().isBlank() && !request.getUsername().equals(user.getUsername())) {
            if (userRepository.existsByUsername(request.getUsername())) {
                throw new RuntimeException("Username already exists");
            }
            user.setUsername(request.getUsername());
            usernameChanged = true;
        }

        if (request.getAvatar() != null && !request.getAvatar().isBlank()) {
            user.setAvatar(request.getAvatar());
        }

        user.setPhoneNumber(request.getPhoneNumber());
        user.setBirthDate(request.getBirthDate());
        user.setCountry(request.getCountry());
        user.setCurrency(request.getCurrency());
        user.setLanguage(request.getLanguage());

        userRepository.save(user);

        UserProfileResponse response = mapToResponse(user);
        if (usernameChanged) {
            response.setToken(generateToken(user));
        }

        return response;
    }

    private String generateToken(User user) {
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.getRoles().stream()
                        .map(role -> new SimpleGrantedAuthority(role.getName()))
                        .toList()
        );
        return jwtUtils.generateToken(userDetails);
    }

    private UserProfileResponse mapToResponse(User user) {
        return new UserProfileResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getBirthDate(),
                user.getCountry(),
                user.getCurrency(),
                user.getLanguage(),
                user.getRoles(),
                user.getAvatar(),
                user.getCreatedAt() != null ? user.getCreatedAt().toString() : null,
                null
        );
    }

    @PostMapping("/change-email")
    public UserProfileResponse changeEmail(@AuthenticationPrincipal CustomUserDetails userDetails,
                                          @RequestBody ChangeEmailRequest request) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        if (userRepository.existsByEmail(request.getNewEmail())) {
            throw new RuntimeException("Email already in use");
        }

        user.setEmail(request.getNewEmail());
        userRepository.save(user);

        return mapToResponse(user);
    }

    @PostMapping("/change-password")
    public UserProfileResponse changePassword(@AuthenticationPrincipal CustomUserDetails userDetails,
                                             @RequestBody ChangePasswordRequest request) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return mapToResponse(user);
    }

    @PostMapping("/delete-account")
    public void deleteAccount(@AuthenticationPrincipal CustomUserDetails userDetails,
                             @RequestBody DeleteAccountRequest request) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Password is incorrect");
        }

        // Soft delete: disable the user instead of deleting
        user.setEnabled(false);
        userRepository.save(user);
    }
}
