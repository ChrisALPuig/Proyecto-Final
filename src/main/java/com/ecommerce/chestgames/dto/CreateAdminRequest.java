package com.ecommerce.chestgames.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateAdminRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String password;
}
