package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.entity.Payment;
import com.ecommerce.chestgames.repository.PaymentRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    /**
     * Crea un PaymentIntent para un carrito completo
     */
    @PostMapping("/create-intent")
    public Map<String, String> createPaymentIntent(@RequestBody Map<String, Object> payload) {
        Map<String, String> response = new HashMap<>();

        try {
            // Obtener items desde el payload
            List<Map<String, Object>> items = (List<Map<String, Object>>) payload.get("items");

            // Calcular el total en centavos
            long amount = items.stream()
                    .mapToLong(item -> {
                        double price = Double.parseDouble(item.get("price").toString());
                        int quantity = Integer.parseInt(item.get("quantity").toString());
                        return Math.round(price * 100) * quantity; // Convertir a centavos
                    })
                    .sum();

            // Crear PaymentIntent
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amount)
                    .setCurrency("eur")
                    .build();

            PaymentIntent intent = PaymentIntent.create(params);

            // Guardar en la base de datos si quieres (opcional)
            Payment payment = new Payment();
            payment.setPaymentId(intent.getId());
            payment.setAmount(amount);
            payment.setStatus("created");
            paymentRepository.save(payment);

            // Devolver clientSecret al frontend
            response.put("clientSecret", intent.getClientSecret());

        } catch (StripeException e) {
            response.put("error", e.getMessage());
        } catch (Exception e) {
            response.put("error", e.getMessage());
        }

        return response;
    }

    @PostMapping("/update/{paymentId}")
    public Map<String, String> updatePayment(
            @PathVariable String paymentId,
            @RequestBody Map<String, String> payload) {

        Map<String, String> response = new HashMap<>();
        try {
            Payment payment = paymentRepository.findByPaymentId(paymentId);
            if (payment != null) {
                if (payload.containsKey("status")) {
                    payment.setStatus(payload.get("status"));
                }
                if (payload.containsKey("stripePaymentId")) {
                    payment.setPaymentId(payload.get("stripePaymentId"));
                }
                paymentRepository.save(payment);
                response.put("status", "success");
            } else {
                response.put("status", "not_found");
            }
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
        }
        return response;
    }
}