package com.ecommerce.chestgames.repository;

import com.ecommerce.chestgames.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
