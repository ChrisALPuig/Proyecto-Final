package com.ecommerce.chestgames.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Set;

@Getter
@Setter
public class ProductRequest {

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private BigDecimal price;

    private int stock;

    @NotBlank
    private String platform;

    private String imageUrl;

    private Set<String> categories;
}

