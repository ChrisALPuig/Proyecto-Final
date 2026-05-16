package com.ecommerce.chestgames.service;

import com.ecommerce.chestgames.repository.GameRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class GameInitializerService {

    private static final Logger logger = LoggerFactory.getLogger(GameInitializerService.class);
    private static final int EXPECTED_GAME_COUNT = 30;

    private final IgdbService igdbService;
    private final GameRepository gameRepository;
    private final GamePricingService gamePricingService;

    public GameInitializerService(IgdbService igdbService, GameRepository gameRepository, GamePricingService gamePricingService) {
        this.igdbService = igdbService;
        this.gameRepository = gameRepository;
        this.gamePricingService = gamePricingService;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void initializeGames() {
        long gameCount = gameRepository.count();
        
        // If we already have 30 or more games, skip initialization
        if (gameCount >= EXPECTED_GAME_COUNT) {
            logger.info("✓ Database already contains {} games. Skipping initialization.", gameCount);
            // Apply varied prices and discounts to existing games
            logger.info("=== Updating prices and discounts for existing games ===");
            gamePricingService.updateAllGamePrices();
            return;
        }
        
        logger.info("=== Starting automatic game population from IGDB ===");
        try {
            var games = igdbService.populateTop30Games();
            logger.info("=== Successfully loaded {} games from IGDB ===", games.size());
            
            // Apply varied prices and discounts
            logger.info("=== Applying varied prices and discounts ===");
            gamePricingService.updateAllGamePrices();
        } catch (Exception e) {
            logger.error("=== Error loading games from IGDB: {} ===", e.getMessage(), e);
        }
    }
}
