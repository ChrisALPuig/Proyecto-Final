package com.ecommerce.chestgames.service;

import com.ecommerce.chestgames.dto.WishlistItemDTO;
import com.ecommerce.chestgames.entity.Game;
import com.ecommerce.chestgames.entity.User;
import com.ecommerce.chestgames.entity.Wishlist;
import com.ecommerce.chestgames.repository.GameRepository;
import com.ecommerce.chestgames.repository.WishlistRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final GameRepository gameRepository;
    private final IgdbService igdbService;

    public WishlistService(WishlistRepository wishlistRepository, GameRepository gameRepository, IgdbService igdbService) {
        this.wishlistRepository = wishlistRepository;
        this.gameRepository = gameRepository;
        this.igdbService = igdbService;
    }

    // Devuelve la wishlist como lista de DTO para el frontend
    @Transactional
    public List<WishlistItemDTO> getWishlist(User user) {
        Wishlist wishlist = wishlistRepository.findByUser(user)
                .orElseGet(() -> {
                    Wishlist newWishlist = new Wishlist();
                    newWishlist.setUser(user);
                    newWishlist.setGames(new HashSet<>());
                    return wishlistRepository.save(newWishlist);
                });

        return wishlist.getGames().stream()
                .map(game -> new WishlistItemDTO(
                        game.getId(),
                        game.getTitle(),
                        game.getPrice(),
                        game.getCoverImage()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public void addGameToWishlist(User user, Long gameId) {
        Wishlist wishlist = wishlistRepository.findByUser(user)
                .orElseGet(() -> {
                    Wishlist newWishlist = new Wishlist();
                    newWishlist.setUser(user);
                    newWishlist.setGames(new HashSet<>());
                    return wishlistRepository.save(newWishlist);
                });

        Game game = gameRepository.findById(gameId)
                .orElseGet(() -> {
                    Game igdbGame = igdbService.searchGameById(gameId);
                    if (igdbGame == null) {
                        throw new RuntimeException("Game not found");
                    }
                    return igdbGame;
                });

        if (wishlist.getGames().stream().noneMatch(g -> g.getId().equals(gameId))) {
            wishlist.getGames().add(game);
        }
        wishlistRepository.save(wishlist);
    }

    @Transactional
    public void removeGameFromWishlist(User user, Long gameId) {
        Wishlist wishlist = wishlistRepository.findByUser(user)
                .orElseGet(() -> {
                    Wishlist newWishlist = new Wishlist();
                    newWishlist.setUser(user);
                    newWishlist.setGames(new HashSet<>());
                    return wishlistRepository.save(newWishlist);
                });

        wishlist.getGames().removeIf(g -> g.getId().equals(gameId));
        wishlistRepository.save(wishlist);
    }
}