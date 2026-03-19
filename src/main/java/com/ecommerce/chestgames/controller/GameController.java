package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.entity.Game;
import com.ecommerce.chestgames.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
public class GameController {

    private final GameRepository gameRepository;

    // Obtener todos los juegos
    @GetMapping
    public List<Game> getAllGames() {
        List<Game> games = gameRepository.findAll();
        // Forzar carga de colecciones para cada juego
        games.forEach(this::initializeCollections);
        return games;
    }

    // Obtener un juego por ID
    @GetMapping("/{id}")
    public Game getGame(@PathVariable Long id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found"));
        // Forzar carga de colecciones para evitar null
        initializeCollections(game);
        return game;
    }

    // Método privado para inicializar listas y evitar problemas de lazy loading
    private void initializeCollections(Game game) {
        if (game.getImages() != null) game.getImages().size();
        if (game.getGenres() != null) game.getGenres().size();
        if (game.getTags() != null) game.getTags().size();
        if (game.getFeatures() != null) game.getFeatures().size();
    }
}