package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.entity.Payment;
import com.ecommerce.chestgames.entity.User;
import com.ecommerce.chestgames.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private PaymentRepository paymentRepository;

    @PostMapping("/continue-to-payment")
    public Map<String, String> continueToPayment(@RequestBody Map<String, Object> payload) {
        Map<String, String> response = new HashMap<>();

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();

            String orderId = payload.get("orderId").toString();
            String productName = payload.get("productName").toString();
            Long amount = Long.parseLong(payload.get("amount").toString()); // en euros

            Payment payment = new Payment();
            payment.setOrderId(orderId);
            payment.setProductName(productName);
            payment.setAmount(amount);
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