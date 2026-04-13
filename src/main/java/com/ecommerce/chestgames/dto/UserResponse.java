package com.ecommerce.chestgames.dto;

import com.ecommerce.chestgames.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;
import java.util.stream.Collectors;

@Data
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private Set<String> roles;

    public UserResponse(Long id, String username, String email, Set<Role> roles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles.stream()
                .map(Role::getName)
                .collect(Collectors.toSet());
    }
}