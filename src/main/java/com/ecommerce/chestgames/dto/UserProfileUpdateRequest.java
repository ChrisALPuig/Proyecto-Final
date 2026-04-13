package com.ecommerce.chestgames.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserProfileUpdateRequest {
    private String username;
    private String avatar;
    private String phoneNumber;
    private String birthDate;
    private String country;
    private String currency;
    private String language;
}
