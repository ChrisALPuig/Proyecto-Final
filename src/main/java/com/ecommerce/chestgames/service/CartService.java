package com.ecommerce.chestgames.service;

import com.ecommerce.chestgames.entity.Cart;
import com.ecommerce.chestgames.entity.CartItem;
import com.ecommerce.chestgames.entity.Product;
import com.ecommerce.chestgames.entity.User;
import com.ecommerce.chestgames.repository.CartRepository;
import com.ecommerce.chestgames.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    // ==============================
    // OBTENER O CREAR CARRITO
    // ==============================
    private Cart getOrCreateCart(User user) {
        return cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setUser(user);
                    return cartRepository.save(cart);
                });
    }

    // ==============================
    // AGREGAR PRODUCTO
    // ==============================
    @Transactional
    public void addProduct(Long productId, Integer quantity, User user) {

        if (quantity <= 0) {
            throw new RuntimeException("La cantidad debe ser mayor a 0");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (product.getStock() < quantity) {
            throw new RuntimeException("Stock insuficiente");
        }

        Cart cart = getOrCreateCart(user);

        Optional<CartItem> existingItem = cart.getItems()
                .stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {

            CartItem item = existingItem.get();
            int newQuantity = item.getQuantity() + quantity;

            if (product.getStock() < newQuantity) {
                throw new RuntimeException("Stock insuficiente");
            }

            item.setQuantity(newQuantity);

        } else {

            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(quantity);

            cart.getItems().add(newItem);
        }

        cartRepository.save(cart);
    }

    // ==============================
    // QUITAR PRODUCTO COMPLETAMENTE
    // ==============================
    @Transactional
    public void removeProduct(Long productId, User user) {

        Cart cart = getOrCreateCart(user);

        cart.getItems().removeIf(item ->
                item.getProduct().getId().equals(productId)
        );

        cartRepository.save(cart);
    }

    // ==============================
    // LIMPIAR CARRITO
    // ==============================
    @Transactional
    public void clearCart(User user) {

        Cart cart = getOrCreateCart(user);
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    // ==============================
    // OBTENER CARRITO
    // ==============================
    public Cart getCart(User user) {
        return getOrCreateCart(user);
    }
}
