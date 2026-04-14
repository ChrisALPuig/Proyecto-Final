package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.dto.AuthResponse;
import com.ecommerce.chestgames.dto.CreateAdminRequest;
import com.ecommerce.chestgames.dto.LoginRequest;
import com.ecommerce.chestgames.dto.RegisterRequest;
import com.ecommerce.chestgames.entity.Role;
import com.ecommerce.chestgames.entity.User;
import com.ecommerce.chestgames.repository.RoleRepository;
import com.ecommerce.chestgames.repository.UserRepository;
import com.ecommerce.chestgames.security.CustomUserDetails;
import com.ecommerce.chestgames.utils.JwtUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

import java.util.List;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid RegisterRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().build();
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().build();
        }

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Role not found"));

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.getRoles().add(userRole);

        userRepository.save(user);

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
            String token = jwtUtils.generateToken(userDetails);

            List<String> roles = userDetails.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();

            User loggedUser = ((CustomUserDetails) userDetails).getUser();

            return ResponseEntity.ok(
                    new AuthResponse(token, userDetails.getUsername(), roles, loggedUser)
            );
        } catch (org.springframework.security.core.AuthenticationException ex) {
            return ResponseEntity.status(401).build();
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

}