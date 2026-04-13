package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.dto.WishlistItemDTO;
import com.ecommerce.chestgames.entity.User;
import com.ecommerce.chestgames.service.WishlistService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
    public List<WishlistItemDTO> getWishlist(@AuthenticationPrincipal User user) {
        return wishlistService.getWishlist(user);
    }

    @PostMapping("/{gameId}")
    public void addGame(@AuthenticationPrincipal User user, @PathVariable Long gameId) {
        wishlistService.addGameToWishlist(user, gameId);
    }

    @DeleteMapping("/{gameId}")
    public void removeGame(@AuthenticationPrincipal User user, @PathVariable Long gameId) {
        wishlistService.removeGameFromWishlist(user, gameId);
    }
}