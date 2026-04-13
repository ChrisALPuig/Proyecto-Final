package com.ecommerce.chestgames.service;

import com.ecommerce.chestgames.entity.Game;
import com.ecommerce.chestgames.repository.GameRepository;
import org.springframework.stereotype.Service;

@Service
public class GameService {
    private final GameRepository repository;

    public GameService(GameRepository repository) {
        this.repository = repository;
    }

    public Game getGameByTitle(String title) {
        return repository.findByTitle(title);
    }
}