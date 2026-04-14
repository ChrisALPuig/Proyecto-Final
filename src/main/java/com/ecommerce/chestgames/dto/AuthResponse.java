package com.ecommerce.chestgames.dto;

import com.ecommerce.chestgames.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private String username;
    private List<String> roles;
    private User user;
}
