package com.ecommerce.chestgames.repository;

import com.ecommerce.chestgames.entity.Cart;
import com.ecommerce.chestgames.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}