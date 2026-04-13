package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.entity.Payment;
import com.ecommerce.chestgames.entity.User;
import com.ecommerce.chestgames.repository.PaymentRepository;
import com.ecommerce.chestgames.repository.UserRepository;
import com.ecommerce.chestgames.security.CustomUserDetails;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create-intent")
    public Map<String, String> createPaymentIntent(@RequestBody Map<String, Object> payload) {
        Map<String, String> response = new HashMap<>();

        try {
            List<Map<String, Object>> items = (List<Map<String, Object>>) payload.get("items");
            String orderId = payload.get("orderId").toString();

            // Calcular total en euros
            BigDecimal totalEuros = items.stream()
                    .map(item -> {
                        BigDecimal price = new BigDecimal(item.get("price").toString());
                        int quantity = Integer.parseInt(item.get("quantity").toString());
                        return price.multiply(BigDecimal.valueOf(quantity));
                    })
                    .reduce(BigDecimal.ZERO, BigDecimal::add)
                    .setScale(2, RoundingMode.HALF_UP);

            // Convertir a centavos para Stripe
            long amountInCents = totalEuros.multiply(BigDecimal.valueOf(100)).longValueExact();

            // Crear PaymentIntent en Stripe con metadata orderId
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amountInCents)
                    .setCurrency("eur")
                    .putMetadata("orderId", orderId)
                    .build();

            PaymentIntent intent = PaymentIntent.create(params);

            // Actualizar registro existente en BD (tomar el más reciente si hay múltiples)
            Payment payment = paymentRepository.findFirstByOrderIdOrderByCreatedAtDesc(orderId);
            if (payment != null) {
                payment.setPaymentId(intent.getId());
                payment.setAmount(totalEuros); // ⚡ guardar en euros con decimales
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
    public List<Payment> getUserPayments(@AuthenticationPrincipal CustomUserDetails currentUserDetails) {
        if (currentUserDetails == null) {
            throw new RuntimeException("Usuario no autenticado");
        }
        User currentUser = userRepository.findByUsername(currentUserDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return paymentRepository.findByUser(currentUser);
    }
}