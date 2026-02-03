package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.dto.UserResponse;
import com.ecommerce.chestgames.entity.User;
import com.ecommerce.chestgames.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping
    public List<UserResponse> getUsers(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String role,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(0, size); // solo página 0

        // Trae usuarios filtrados (como ya lo tienes)
        Page<User> users = userRepository.findUsersByFilters(username, email, role, pageable);

        // Convierte a DTO incluyendo roles y devuelve como List
        return users.stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getRoles()
                ))
                .toList();
    }
}