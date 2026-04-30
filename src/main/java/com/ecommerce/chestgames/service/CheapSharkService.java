package com.ecommerce.chestgames.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class CheapSharkService {

    private static final long CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000L;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();
    private final Map<String, CachedPrice> priceCache = new ConcurrentHashMap<>();
    private volatile long lastRequestAt = 0L;

    public Double fetchLowestPrice(String title) {
        if (title == null || title.isBlank()) {
            return null;
        }

        String normalizedTitle = title.trim().toLowerCase();
        CachedPrice cached = priceCache.get(normalizedTitle);
        if (cached != null && !cached.isExpired()) {
            return cached.getPrice();
        }

        throttleRequests();

        try {
            String url = UriComponentsBuilder
                    .fromHttpUrl("https://www.cheapshark.com/api/1.0/games")
                    .queryParam("title", title)
                    .toUriString();

            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                return null;
            }

            JsonNode root = mapper.readTree(response.getBody());
            if (!root.isArray() || root.isEmpty()) {
                return null;
            }

            JsonNode firstMatch = root.get(0);
            if (firstMatch == null || !firstMatch.has("cheapest")) {
                return null;
            }

            String cheapest = firstMatch.get("cheapest").asText();
            Double price = parsePrice(cheapest);
            if (price != null) {
                priceCache.put(normalizedTitle, new CachedPrice(price, System.currentTimeMillis() + CACHE_EXPIRY_MS));
            }
            return price;
        } catch (HttpClientErrorException.TooManyRequests e) {
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private void throttleRequests() {
        synchronized (this) {
            long now = System.currentTimeMillis();
            long elapsed = now - lastRequestAt;
            long delay = 250L;
            if (elapsed < delay) {
                try {
                    Thread.sleep(delay - elapsed);
                } catch (InterruptedException ignored) {
                    Thread.currentThread().interrupt();
                }
            }
            lastRequestAt = System.currentTimeMillis();
        }
    }

    private Double parsePrice(String priceText) {
        if (priceText == null || priceText.isBlank()) {
            return null;
        }

        try {
            return Double.parseDouble(priceText);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private static class CachedPrice {
        private final Double price;
        private final long expiresAt;

        public CachedPrice(Double price, long expiresAt) {
            this.price = price;
            this.expiresAt = expiresAt;
        }

        public Double getPrice() {
            return price;
        }

        public boolean isExpired() {
            return System.currentTimeMillis() > expiresAt;
        }
    }
}
