package com.ecommerce.chestgames.service;

import com.ecommerce.chestgames.dto.CartItemDTO;
import com.ecommerce.chestgames.entity.CartItem;
import com.ecommerce.chestgames.entity.Game;
import com.ecommerce.chestgames.entity.User;
import com.ecommerce.chestgames.entity.Cart;
import com.ecommerce.chestgames.repository.CartRepository;
import com.ecommerce.chestgames.repository.GameRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final GameRepository gameRepository;

    public CartService(CartRepository cartRepository, GameRepository gameRepository) {
        this.cartRepository = cartRepository;
        this.gameRepository = gameRepository;
    }

    @Transactional
    public List<CartItemDTO> getCart(User user) {
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    newCart.setItems(new HashSet<>());
                    return cartRepository.save(newCart);
                });

        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            return new ArrayList<>();
        }

        return cart.getItems().stream()
                .map(item -> new CartItemDTO(
                        item.getGame().getId(),
                        item.getGame().getTitle(),
                        item.getGame().getPrice(),
                        item.getGame().getCoverImage(),
                        item.getQuantity()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public void addGameToCart(User user, Long gameId, int quantity) {
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    newCart.setItems(new HashSet<>());
                    return cartRepository.save(newCart);
                });

        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));

        var existingItem = cart.getItems().stream()
                .filter(i -> i.getGame().getId().equals(gameId))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + quantity);
        } else {
            CartItem newItem = new CartItem();
            newItem.setGame(game);
            newItem.setQuantity(quantity);
            newItem.setCart(cart);
            cart.getItems().add(newItem);
        }

        cartRepository.save(cart);
    }

    @Transactional
    public void updateGameQuantity(User user, Long gameId, int quantity) {
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getItems().stream()
                .filter(i -> i.getGame().getId().equals(gameId))
                .findFirst()
                .ifPresent(i -> i.setQuantity(quantity));

        cartRepository.save(cart);
    }

    @Transactional
    public void removeGameFromCart(User user, Long gameId) {
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getItems().removeIf(i -> i.getGame().getId().equals(gameId));

        cartRepository.save(cart);
    }

    @Transactional
    public void clearCart(User user) {
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getItems().clear();
        cartRepository.save(cart);
    }
}