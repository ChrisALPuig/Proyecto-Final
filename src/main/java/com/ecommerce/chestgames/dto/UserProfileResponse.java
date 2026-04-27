package com.ecommerce.chestgames.dto;

import com.ecommerce.chestgames.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {
    private Long id;
    private String username;
    private String email;
    private String phoneNumber;
    private String birthDate;
    private String country;
    private String currency;
    private String language;
    private Set<Role> roles;
    private String avatar;
    private String createdAt;
    private String token;
}
