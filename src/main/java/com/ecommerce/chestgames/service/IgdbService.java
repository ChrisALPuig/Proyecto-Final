package com.ecommerce.chestgames.service;

import com.ecommerce.chestgames.dto.IgdbGameDTO;
import com.ecommerce.chestgames.entity.Game;
import com.ecommerce.chestgames.mappers.GameMapper;
import com.ecommerce.chestgames.repository.GameRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class IgdbService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final TwitchAuthService authService;
    private final GameRepository repository;
    private final GameMapper gameMapper;
    private final CheapSharkService cheapSharkService;

    private final String clientId = "371c2gm5j7jl7p6qllac5jiwkc38mi"; // ⚠️ mejor externalizar en application.properties

    public IgdbService(TwitchAuthService authService, GameRepository repository, GameMapper gameMapper, CheapSharkService cheapSharkService) {
        this.authService = authService;
        this.repository = repository;
        this.gameMapper = gameMapper;
        this.cheapSharkService = cheapSharkService;
    }

    public IgdbGameDTO searchGameByName(String gameName) {
        List<IgdbGameDTO> results = queryIgdbGames(gameName, 1);
        return results.isEmpty() ? null : results.get(0);
    }

    public List<IgdbGameDTO> searchGames(String gameName, int limit) {
        List<IgdbGameDTO> results = queryIgdbGames(gameName, limit);
        return results == null ? Collections.emptyList() : results;
    }

    public Game searchGameById(Long igdbId) {
        if (igdbId == null) {
            return null;
        }
        IgdbGameDTO dto = queryIgdbGameById(igdbId);
        return dto == null ? null : getOrCreateGame(dto);
    }

    private IgdbGameDTO queryIgdbGameById(Long igdbId) {
        try {
            String token = authService.getAccessToken();
            String url = "https://api.igdb.com/v4/games";

            HttpHeaders headers = new HttpHeaders();
            headers.set("Client-ID", clientId);
            headers.set("Authorization", "Bearer " + token);
            headers.setContentType(MediaType.TEXT_PLAIN);

            String body = String.format("fields name,summary,genres.name,cover.url,screenshots.url,videos.video_id,storyline; where id = %d;", igdbId);

            HttpEntity<String> entity = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());
            if (root == null || !root.isArray() || root.isEmpty()) {
                return null;
            }

            IgdbGameDTO dto = parseGameNode(root.get(0));
            dto.setPrice(fetchPriceForGame(dto.getName()));
            return dto;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private Game getOrCreateGame(IgdbGameDTO dto) {
        if (dto.getName() == null || dto.getName().isBlank()) {
            return null;
        }

        if (dto.getId() != null) {
            return repository.findById(dto.getId()).orElseGet(() -> {
                Game existingByTitle = repository.findByTitle(dto.getName());
                if (existingByTitle != null) {
                    return existingByTitle;
                }
                Game newGame = gameMapper.mapToGame(dto);
                return repository.save(newGame);
            });
        }

        Game existing = repository.findByTitle(dto.getName());
        if (existing != null) {
            return existing;
        }

        Game newGame = gameMapper.mapToGame(dto);
        return repository.save(newGame);
    }

    private List<IgdbGameDTO> queryIgdbGames(String gameName, int limit) {
        try {
            String token = authService.getAccessToken();
            String url = "https://api.igdb.com/v4/games";

            HttpHeaders headers = new HttpHeaders();
            headers.set("Client-ID", clientId);
            headers.set("Authorization", "Bearer " + token);
            headers.setContentType(MediaType.TEXT_PLAIN);

            String body;
            if (gameName == null || gameName.isBlank()) {
                body = """
                        fields name,summary,genres.name,cover.url,screenshots.url,videos.video_id,storyline,rating,hypes,platforms;
                        where platforms = (6) & cover != null & rating >= 70;
                        sort popularity desc;
                        limit %d;
                    """.formatted(limit);
            } else {
                body = """
                        search "%s";
                        fields name,summary,genres.name,cover.url,screenshots.url,videos.video_id,storyline,rating,hypes,platforms;
                        where platforms = (6) & cover != null & rating >= 70;
                        limit %d;
                    """.formatted(gameName, limit);
            }

            HttpEntity<String> entity = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());
            if (root == null || !root.isArray() || root.isEmpty()) {
                return Collections.emptyList();
            }

            List<IgdbGameDTO> results = new ArrayList<>();
            for (JsonNode gameNode : root) {
                results.add(parseGameNode(gameNode));
            }
            enrichPrices(results);
            return results;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    private void enrichPrices(List<IgdbGameDTO> games) {
        if (games == null || games.isEmpty()) {
            return;
        }

        for (IgdbGameDTO dto : games) {
            dto.setPrice(fetchPriceForGame(dto.getName()));
        }
    }

    private Double fetchPriceForGame(String title) {
        try {
            return cheapSharkService.fetchLowestPrice(title);
        } catch (Exception e) {
            return null;
        }
    }

    private IgdbGameDTO parseGameNode(JsonNode gameNode) {
        IgdbGameDTO dto = new IgdbGameDTO();
        if (gameNode.has("id")) {
            dto.setId(gameNode.get("id").asLong());
        }
        dto.setName(getSafeText(gameNode, "name"));
        dto.setSummary(getSafeText(gameNode, "summary"));
        dto.setStoryline(getSafeText(gameNode, "storyline"));

        if (gameNode.has("cover") && gameNode.get("cover").has("url")) {
            dto.setCoverUrl(gameNode.get("cover").get("url").asText());
        }

        if (gameNode.has("screenshots")) {
            List<String> images = new ArrayList<>();
            for (JsonNode img : gameNode.get("screenshots")) {
                if (img.has("url")) {
                    images.add(img.get("url").asText());
                }
            }
            dto.setScreenshots(images);
        }

        if (gameNode.has("videos")) {
            List<String> videos = new ArrayList<>();
            for (JsonNode vid : gameNode.get("videos")) {
                if (vid.has("video_id")) {
                    videos.add("https://www.youtube.com/watch?v=" + vid.get("video_id").asText());
                }
            }
            dto.setVideos(videos);
        }

        if (gameNode.has("genres")) {
            List<String> genres = new ArrayList<>();
            for (JsonNode genre : gameNode.get("genres")) {
                if (genre.has("name")) {
                    genres.add(genre.get("name").asText());
                }
            }
            dto.setGenres(genres);
        }

        return dto;
    }

    private String getSafeText(JsonNode node, String field) {
        return node.has(field) ? node.get(field).asText(null) : null;
    }
}