package com.ecommerce.chestgames.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
public class ProductResponse {

    private Long id;
    private String title;
    private BigDecimal price;
    private String platform;
    private String imageUrl;
    private Set<String> categories;
}
