package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.dto.CartItemDTO;
import com.ecommerce.chestgames.security.CustomUserDetails;
import com.ecommerce.chestgames.service.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public List<CartItemDTO> getCart(@AuthenticationPrincipal CustomUserDetails principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        return cartService.getCart(principal.getUser());
    }

    @PostMapping("/{gameId}")
    public void addToCart(@AuthenticationPrincipal CustomUserDetails principal, @PathVariable Long gameId) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        cartService.addGameToCart(principal.getUser(), gameId, 1); // cantidad por defecto 1
    }

    @PutMapping("/{gameId}")
    public void updateQuantity(@AuthenticationPrincipal CustomUserDetails principal,
                               @PathVariable Long gameId,
                               @RequestParam int quantity) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        cartService.updateGameQuantity(principal.getUser(), gameId, quantity);
    }

    @DeleteMapping("/{gameId}")
    public void removeFromCart(@AuthenticationPrincipal CustomUserDetails principal, @PathVariable Long gameId) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        cartService.removeGameFromCart(principal.getUser(), gameId);
    }

    @DeleteMapping
    public void clearCart(@AuthenticationPrincipal CustomUserDetails principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        cartService.clearCart(principal.getUser());
    }
}