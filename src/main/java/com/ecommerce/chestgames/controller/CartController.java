package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.dto.CartItemDTO;
import com.ecommerce.chestgames.entity.User;
import com.ecommerce.chestgames.service.CartService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public List<CartItemDTO> getCart(@AuthenticationPrincipal User user) {
        return cartService.getCart(user);
    }

    @PostMapping("/{gameId}")
    public void addToCart(@AuthenticationPrincipal User user, @PathVariable Long gameId) {
        cartService.addGameToCart(user, gameId, 1); // cantidad por defecto 1
    }

    @PutMapping("/{gameId}")
    public void updateQuantity(@AuthenticationPrincipal User user,
                               @PathVariable Long gameId,
                               @RequestParam int quantity) {
        cartService.updateGameQuantity(user, gameId, quantity);
    }

    @DeleteMapping("/{gameId}")
    public void removeFromCart(@AuthenticationPrincipal User user, @PathVariable Long gameId) {
        cartService.removeGameFromCart(user, gameId);
    }

    @DeleteMapping
    public void clearCart(@AuthenticationPrincipal User user) {
        cartService.clearCart(user);
    }
}