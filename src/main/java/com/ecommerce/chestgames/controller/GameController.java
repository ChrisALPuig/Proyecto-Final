package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.entity.Game;
import com.ecommerce.chestgames.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
public class GameController {

    private final GameRepository gameRepository;

    @Transactional
    @GetMapping
    public List<Game> getAllGames() {
        List<Game> games = gameRepository.findAll();
        games.forEach(this::initializeCollections);
        return games;
    }

    @Transactional
    @GetMapping("/search")
    public List<Game> searchGames(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "all") String filter,
            @RequestParam(required = false) List<String> genres,
            @RequestParam(required = false) Boolean free,
            @RequestParam(required = false) Boolean discounted
    ) {
        List<Game> games = gameRepository.findAll();

        if (query != null && !query.isBlank()) {
            String lowercaseQuery = query.toLowerCase();
            games = games.stream()
                    .filter(game -> game.getTitle() != null && game.getTitle().toLowerCase().contains(lowercaseQuery))
                    .collect(Collectors.toList());
        }

        if (genres != null && !genres.isEmpty()) {
            games = games.stream()
                    .filter(game -> game.getGenres().stream().anyMatch(genres::contains))
                    .collect(Collectors.toList());
        }

        if (Boolean.TRUE.equals(free)) {
            games = games.stream()
                    .filter(game -> game.getPrice() != null && game.getPrice() == 0.0)
                    .collect(Collectors.toList());
        }

        if (Boolean.TRUE.equals(discounted)) {
            games = games.stream()
                    .filter(game -> game.getPrice() != null && game.getPrice() < 20.0)
                    .collect(Collectors.toList());
        }

        games = applyFilter(games, filter);
        games.forEach(this::initializeCollections);
        return games;
    }

    private List<Game> applyFilter(List<Game> games, String filter) {
        if (filter == null || filter.isBlank() || "all".equals(filter)) {
            return games;
        }

        switch (filter) {
            case "discounted":
                return games.stream()
                        .filter(game -> game.getPrice() != null && game.getPrice() < 20.0)
                        .collect(Collectors.toList());
            case "free":
                return games.stream()
                        .filter(game -> game.getPrice() != null && game.getPrice() == 0.0)
                        .collect(Collectors.toList());
            case "dlcs":
                return games.stream()
                        .filter(game -> game.getTags().stream().anyMatch(tag -> tag.equalsIgnoreCase("dlc"))
                                || game.getFeatures().stream().anyMatch(feature -> feature.equalsIgnoreCase("dlc")))
                        .collect(Collectors.toList());
            case "hide-dlcs":
                return games.stream()
                        .filter(game -> game.getTags().stream().noneMatch(tag -> tag.equalsIgnoreCase("dlc"))
                                && game.getFeatures().stream().noneMatch(feature -> feature.equalsIgnoreCase("dlc")))
                        .collect(Collectors.toList());
            case "new-arrivals":
            case "upcoming":
            case "early-access":
                return games.stream()
                        .filter(game -> game.getTags().stream().anyMatch(tag -> tag.equalsIgnoreCase(filter)
                                || tag.equalsIgnoreCase(filter.replace('-', ' '))))
                        .collect(Collectors.toList());
            default:
                return games;
        }
    }

    @Transactional
    @GetMapping("/{id}")
    public Game getGameById(@PathVariable Long id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found with id: " + id));
        initializeCollections(game);
        return game;
    }

    private void initializeCollections(Game game) {
        if (game.getImages() != null) game.getImages().size();
        if (game.getGenres() != null) game.getGenres().size();
        if (game.getTags() != null) game.getTags().size();
        if (game.getFeatures() != null) game.getFeatures().size();
    }
}
