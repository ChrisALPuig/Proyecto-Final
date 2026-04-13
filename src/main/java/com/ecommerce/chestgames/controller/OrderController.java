package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.entity.Payment;
import com.ecommerce.chestgames.entity.User;
import com.ecommerce.chestgames.repository.PaymentRepository;
import com.ecommerce.chestgames.repository.UserRepository;
import com.ecommerce.chestgames.security.CustomUserDetails;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/continue-to-payment")
    public Map<String, String> continueToPayment(@AuthenticationPrincipal CustomUserDetails currentUserDetails,
                                                 @RequestBody Map<String, Object> payload) {
        Map<String, String> response = new HashMap<>();

        try {
            if (currentUserDetails == null) {
                throw new RuntimeException("Usuario no autenticado");
            }
            User currentUser = userRepository.findByUsername(currentUserDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            String orderId = payload.get("orderId").toString();
            String productName = payload.get("productName").toString();
            BigDecimal amount = new BigDecimal(payload.get("amount").toString()); // en euros con decimales
            String gameImage = payload.get("gameImage") != null ? payload.get("gameImage").toString() : null;
            String items = null;
            if (payload.containsKey("items")) {
                ObjectMapper mapper = new ObjectMapper();
                items = mapper.writeValueAsString(payload.get("items"));
            }

            Payment payment = new Payment();
            payment.setOrderId(orderId);
            payment.setProductName(productName);
            payment.setAmount(amount);
            payment.setGameImage(gameImage);
            payment.setItems(items);
            payment.setStatus("created");
            payment.setCreatedAt(LocalDateTime.now());
            payment.setUser(currentUser);

            paymentRepository.save(payment);

            response.put("status", "success");
            response.put("paymentId", payment.getId().toString());

        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
        }

        return response;
    }
}