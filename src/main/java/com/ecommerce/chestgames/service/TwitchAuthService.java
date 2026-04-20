package com.ecommerce.chestgames.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class TwitchAuthService {

    private final RestTemplate restTemplate = new RestTemplate();

    private final String clientId = "371c2gm5j7jl7p6qllac5jiwkc38mi";
    private final String clientSecret = "1kym0rwvc3t01si6vec7sx5cdxip2p";

    public String getAccessToken() {

        String url = "https://id.twitch.tv/oauth2/token"
                + "?client_id=" + clientId
                + "&client_secret=" + clientSecret
                + "&grant_type=client_credentials";

        ResponseEntity<Map> response = restTemplate.postForEntity(url, null, Map.class);

        return response.getBody().get("access_token").toString();
    }
}