package com.ecommerce.chestgames.mappers;

import com.ecommerce.chestgames.entity.Game;
import com.ecommerce.chestgames.dto.IgdbGameDTO;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GameMapper {

    public Game mapToGame(IgdbGameDTO dto) {

        Game game = new Game();

        game.setTitle(dto.getName());
        game.setDescription(dto.getSummary());
        game.setStory(dto.getStoryline());


        if (dto.getCoverUrl() != null) {
            game.setCoverImage("https:" + dto.getCoverUrl());
        }


        if (dto.getScreenshots() != null) {
            game.setImages(
                    dto.getScreenshots()
                            .stream()
                            .map(url -> "https:" + url)
                            .toList()
            );
        }


        if (dto.getVideos() != null && !dto.getVideos().isEmpty()) {
            game.setHeroVideo(dto.getVideos().get(0));
            game.setTrailerVideo(dto.getVideos().get(0));
        }

        if (dto.getPrice() != null) {
            game.setPrice(dto.getPrice());
        }

        // Default values for IGDB-sourced games
        if (game.getPrice() == null) {
            game.setPrice(19.99);
        }
        game.setSystemRequirementsMin("OS: Windows 10, RAM: 8GB, GPU: GTX 960 or equivalent, Storage: 50GB");
        game.setSystemRequirementsRecommended("OS: Windows 10/11, RAM: 16GB, GPU: GTX 1060 / AMD RX 580 or better, Storage: 50GB");
        game.setFeatures(List.of("Single Player", "Achievements", "Cloud Saves"));

        if (dto.getGenres() != null) {
            game.setGenres(dto.getGenres());
        }

        if (dto.getId() != null) {
            game.setId(dto.getId());
        }

        return game;
    }
}