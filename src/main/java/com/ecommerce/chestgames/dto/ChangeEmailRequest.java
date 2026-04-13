package com.ecommerce.chestgames.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChangeEmailRequest {
    private String currentPassword;
    private String newEmail;
}
