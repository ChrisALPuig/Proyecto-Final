package com.ecommerce.chestgames.repository;

import com.ecommerce.chestgames.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
    Game findByTitle(String title);
}