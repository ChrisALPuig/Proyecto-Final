package com.ecommerce.chestgames.service;

import com.ecommerce.chestgames.entity.Game;
import com.ecommerce.chestgames.mappers.GameMapper;
import com.ecommerce.chestgames.repository.GameRepository;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    private final GameRepository repository;
    private final IgdbService igdbService;
    private final GameMapper gameMapper;

    public GameService(GameRepository repository,
                       IgdbService igdbService,
                       GameMapper gameMapper) {
        this.repository = repository;
        this.igdbService = igdbService;
        this.gameMapper = gameMapper;
    }

    public Game getGameByTitle(String title) {

        // 1️⃣ Buscar primero en tu base de datos
        Game game = repository.findByTitle(title);

        if (game != null) {
            return game;
        }

        // 2️⃣ Si no existe → buscar en IGDB
        var dto = igdbService.searchGameByName(title);

        if (dto == null) {
            return null; // o lanzar excepción
        }

        // 3️⃣ Convertir DTO → Entity
        Game newGame = gameMapper.mapToGame(dto);

        // 4️⃣ Guardar en tu BD (cache local)
        return repository.save(newGame);
    }
}