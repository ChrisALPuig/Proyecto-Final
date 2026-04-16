package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.dto.WishlistItemDTO;
import com.ecommerce.chestgames.security.CustomUserDetails;
import com.ecommerce.chestgames.service.WishlistService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    // Devuelve la wishlist como lista de DTO
    @GetMapping
    public List<WishlistItemDTO> getWishlist(@AuthenticationPrincipal CustomUserDetails principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        return wishlistService.getWishlist(principal.getUser());
    }

    @PostMapping("/{gameId}")
    public void addGame(@AuthenticationPrincipal CustomUserDetails principal, @PathVariable Long gameId) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        wishlistService.addGameToWishlist(principal.getUser(), gameId);
    }

    @DeleteMapping("/{gameId}")
    public void removeGame(@AuthenticationPrincipal CustomUserDetails principal, @PathVariable Long gameId) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        wishlistService.removeGameFromWishlist(principal.getUser(), gameId);
    }
}