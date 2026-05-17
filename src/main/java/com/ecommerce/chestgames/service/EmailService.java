package com.ecommerce.chestgames.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private final String resendApiKey;
    private final String fromEmail;
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public EmailService(@Value("${RESEND_API_KEY:}") String resendApiKey,
                       @Value("${app.email.from:onboarding@resend.dev}") String fromEmail) {
        this.resendApiKey = resendApiKey;
        this.fromEmail = fromEmail;
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
        logger.info("EmailService inicializado con Resend API - From: {}", fromEmail);
    }

    public void sendEmail(String to, String subject, String htmlContent) {
        try {
            if (resendApiKey == null || resendApiKey.isEmpty()) {
                logger.warn("RESEND_API_KEY no configurado. Email no será enviado a: {}", to);
                return;
            }

            logger.debug("Preparando email para: {}", to);

            // Crear payload JSON
            Map<String, Object> payload = new HashMap<>();
            payload.put("from", fromEmail);
            payload.put("to", to);
            payload.put("subject", subject);
            payload.put("html", htmlContent);

            String jsonPayload = objectMapper.writeValueAsString(payload);
            logger.debug("Payload: {}", jsonPayload);

            // Crear HTTP request
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI("https://api.resend.com/emails"))
                    .header("Authorization", "Bearer " + resendApiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                    .build();

            logger.debug("Enviando email a: {} con asunto: {}", to, subject);

            // Enviar request
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                logger.info("Email enviado exitosamente a: {} - Status: {}", to, response.statusCode());
            } else {
                logger.error("FALLO AL ENVIAR EMAIL - Para: {} - Status: {} - Response: {}", 
                        to, response.statusCode(), response.body());
                throw new RuntimeException("Error enviando email. Status: " + response.statusCode());
            }

        } catch (Exception e) {
            logger.error("ERROR INESPERADO ENVIANDO EMAIL - Para: {} - Error: {}", to, e.getMessage(), e);
            throw new RuntimeException("Error enviando email a: " + to, e);
        }
    }
}
