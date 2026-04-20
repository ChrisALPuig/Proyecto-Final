package com.ecommerce.chestgames.dto;

import com.ecommerce.chestgames.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private String username;
    private List<String> roles;
    private User user;
    private boolean twoFactorRequired;

    public AuthResponse(String token, String username, List<String> roles, User user) {
        this(token, username, roles, user, false);
    }
}
