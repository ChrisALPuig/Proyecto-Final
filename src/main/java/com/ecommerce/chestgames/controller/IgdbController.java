package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.dto.IgdbGameDTO;
import com.ecommerce.chestgames.entity.Game;
import com.ecommerce.chestgames.service.IgdbService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/igdb")
public class IgdbController {

    private final IgdbService igdbService;

    public IgdbController(IgdbService igdbService) {
        this.igdbService = igdbService;
    }

    @GetMapping("/games")
    public List<IgdbGameDTO> search(
            @RequestParam(required = false) String name,
            @RequestParam(required = false, defaultValue = "20") int limit
    ) {
        return igdbService.searchGames(name, limit);
    }

    @PostMapping("/populate-30-games")
    public String populate30Games() {
        List<Game> games = igdbService.populateTop30Games();
        return "Successfully saved " + games.size() + " games to the database";
    }
}