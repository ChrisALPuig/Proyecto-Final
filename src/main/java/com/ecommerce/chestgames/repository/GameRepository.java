package com.ecommerce.chestgames.repository;

import com.ecommerce.chestgames.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {
    Game findByTitle(String title);

    List<Game> findByTitleContainingIgnoreCase(String title);
}