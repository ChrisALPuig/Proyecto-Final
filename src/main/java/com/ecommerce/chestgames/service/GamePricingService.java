package com.ecommerce.chestgames.service;

import com.ecommerce.chestgames.entity.Game;
import com.ecommerce.chestgames.repository.GameRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Random;

@Service
public class GamePricingService {

    private final GameRepository gameRepository;
    private final Random random = new Random();

    // Rangos de precios por tipo de juego
    private static final double[] PRICE_TIERS = {9.99, 14.99, 19.99, 29.99, 39.99, 49.99, 59.99, 69.99};
    private static final double[] DISCOUNT_PERCENTAGES = {5.0, 10.0, 15.0, 20.0, 25.0, 30.0};

    public GamePricingService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    /**
     * Asigna precios variados a todos los juegos en la BD
     */
    public void updateAllGamePrices() {
        List<Game> games = gameRepository.findAll();
        for (Game game : games) {
            assignVariedPrice(game);
            // 40% de probabilidad de tener oferta
            if (random.nextDouble() < 0.4) {
                applyRandomDiscount(game);
            }
        }
        gameRepository.saveAll(games);
        System.out.println("✓ Updated prices for " + games.size() + " games");
    }

    /**
     * Asigna un precio variado a un juego individual
     */
    public void assignVariedPrice(Game game) {
        // Selecciona un precio aleatorio de los rangos disponibles
        double price = PRICE_TIERS[random.nextInt(PRICE_TIERS.length)];
        game.setPrice(price);
    }

    /**
     * Aplica un descuento aleatorio a un juego
     */
    public void applyRandomDiscount(Game game) {
        double discount = DISCOUNT_PERCENTAGES[random.nextInt(DISCOUNT_PERCENTAGES.length)];
        game.setIsOnSale(true);
        game.setDiscountPercentage(discount);
    }

    /**
     * Aplica un descuento específico a un juego
     */
    public void applyDiscount(Game game, double discountPercentage) {
        if (discountPercentage > 0 && discountPercentage <= 100) {
            game.setIsOnSale(true);
            game.setDiscountPercentage(discountPercentage);
            gameRepository.save(game);
        }
    }

    /**
     * Remueve descuentos de un juego
     */
    public void removeDiscount(Game game) {
        game.setIsOnSale(false);
        game.setDiscountPercentage(0.0);
        gameRepository.save(game);
    }

    /**
     * Calcula el precio con descuento
     */
    public double calculateFinalPrice(Game game) {
        if (game.getIsOnSale() && game.getDiscountPercentage() > 0) {
            return game.getPrice() * (1 - (game.getDiscountPercentage() / 100));
        }
        return game.getPrice();
    }
}
