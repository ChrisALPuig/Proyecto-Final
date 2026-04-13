package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.entity.Payment;
import com.ecommerce.chestgames.entity.User;
import com.ecommerce.chestgames.repository.PaymentRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @PostMapping("/create-intent")
    public Map<String, String> createPaymentIntent(@RequestBody Map<String, Object> payload) {
        Map<String, String> response = new HashMap<>();

        try {
            List<Map<String, Object>> items = (List<Map<String, Object>>) payload.get("items");
            String orderId = payload.get("orderId").toString();

            // Calcular total en euros
            double totalEuros = items.stream()
                    .mapToDouble(item -> {
                        double price = Double.parseDouble(item.get("price").toString());
                        int quantity = Integer.parseInt(item.get("quantity").toString());
                        return price * quantity; // en euros
                    })
                    .sum();

            // Convertir a centavos para Stripe
            long amountInCents = Math.round(totalEuros * 100);

            // Crear PaymentIntent en Stripe con metadata orderId
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amountInCents)
                    .setCurrency("eur")
                    .putMetadata("orderId", orderId)
                    .build();

            PaymentIntent intent = PaymentIntent.create(params);

            // Actualizar registro existente en BD
            Payment payment = paymentRepository.findByOrderId(orderId);
            if (payment != null) {
                payment.setPaymentId(intent.getId());
                payment.setAmount((long) totalEuros); // ⚡ guardar en euros
                payment.setStatus("success");         // ⚡ status final
                paymentRepository.save(payment);
            }

            // Devolver clientSecret y paymentId al frontend
            response.put("clientSecret", intent.getClientSecret());
            response.put("paymentId", intent.getId());

            System.out.println("PaymentIntent creado: " + intent.getId() + ", total: " + totalEuros + "€");

        } catch (StripeException e) {
            response.put("error", e.getMessage());
            System.err.println("StripeException: " + e.getMessage());
        } catch (Exception e) {
            response.put("error", e.getMessage());
            System.err.println("Exception: " + e.getMessage());
        }

        return response;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public List<Payment> getUserPayments() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return paymentRepository.findByUser(currentUser);
    }
}