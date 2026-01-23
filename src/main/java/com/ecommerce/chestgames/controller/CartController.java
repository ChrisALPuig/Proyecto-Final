package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.entity.User;
import com.ecommerce.chestgames.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public void add(@RequestParam Long productId,
                    @RequestParam int quantity,
                    Authentication authentication) {

        User user = (User) authentication.getPrincipal();
        cartService.addProduct(productId, quantity, user);
    }

    @DeleteMapping("/remove/{productId}")
    public void remove(@PathVariable Long productId,
                       Authentication authentication) {

        User user = (User) authentication.getPrincipal();
        cartService.removeProduct(productId, user);
    }
}
