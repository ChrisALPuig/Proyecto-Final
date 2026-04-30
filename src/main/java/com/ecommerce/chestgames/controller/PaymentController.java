package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.entity.Payment;
import com.ecommerce.chestgames.entity.User;
import com.ecommerce.chestgames.repository.PaymentRepository;
import com.ecommerce.chestgames.repository.UserRepository;
import com.ecommerce.chestgames.security.CustomUserDetails;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
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

    private final ObjectMapper objectMapper = new ObjectMapper();

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
                payment.setStatus("pending"); // Pago pendiente hasta la confirmación de Stripe
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

    @PostMapping("/record")
    @PreAuthorize("hasRole('USER')")
    public Map<String, String> createOrUpdatePayment(@AuthenticationPrincipal CustomUserDetails currentUserDetails,
                                                     @RequestBody Map<String, Object> payload) {
        Map<String, String> response = new HashMap<>();

        if (currentUserDetails == null) {
            response.put("status", "error");
            response.put("message", "Usuario no autenticado");
            return response;
        }

        User currentUser = userRepository.findByUsername(currentUserDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        String orderId = payload.get("orderId") != null ? payload.get("orderId").toString() : null;
        String productName = payload.get("productName") != null ? payload.get("productName").toString() : "";
        String gameImage = payload.get("gameImage") != null ? payload.get("gameImage").toString() : null;
        String status = payload.get("status") != null ? payload.get("status").toString() : "created";
        String stripePaymentId = payload.get("stripePaymentId") != null ? payload.get("stripePaymentId").toString() : null;
        String items = null;
        if (payload.containsKey("items")) {
            Object rawItems = payload.get("items");
            if (rawItems instanceof String) {
                items = rawItems.toString();
            } else {
                try {
                    items = objectMapper.writeValueAsString(rawItems);
                } catch (JsonProcessingException e) {
                    System.err.println("Error serializing payment items: " + e.getMessage());
                }
            }
        }

        BigDecimal amount = BigDecimal.ZERO;
        if (payload.get("amount") != null) {
            amount = new BigDecimal(payload.get("amount").toString());
        }

        Payment payment = null;
        if (orderId != null) {
            payment = paymentRepository.findFirstByOrderIdOrderByCreatedAtDesc(orderId);
        }
        if (payment == null && stripePaymentId != null) {
            payment = paymentRepository.findByPaymentId(stripePaymentId);
        }
        if (payment == null && payload.get("paymentId") != null) {
            try {
                Long recordId = Long.parseLong(payload.get("paymentId").toString());
                payment = paymentRepository.findById(recordId).orElse(null);
            } catch (NumberFormatException ignored) {
            }
        }

        if (payment != null) {
            if (!payment.getUser().getId().equals(currentUser.getId())) {
                response.put("status", "error");
                response.put("message", "Pago no autorizado");
                return response;
            }
            payment.setProductName(productName);
            payment.setGameImage(gameImage);
            payment.setItems(items);
            payment.setOrderId(orderId);
            payment.setAmount(amount);
            payment.setStatus(status);
            if (stripePaymentId != null) {
                payment.setPaymentId(stripePaymentId);
            }
            paymentRepository.save(payment);
            response.put("status", "success");
            response.put("message", "Pago actualizado correctamente");
            return response;
        }

        Payment newPayment = new Payment();
        newPayment.setOrderId(orderId);
        newPayment.setProductName(productName);
        newPayment.setGameImage(gameImage);
        newPayment.setItems(items);
        newPayment.setAmount(amount);
        newPayment.setStatus(status);
        newPayment.setCreatedAt(LocalDateTime.now());
        newPayment.setUser(currentUser);
        if (stripePaymentId != null) {
            newPayment.setPaymentId(stripePaymentId);
        }
        paymentRepository.save(newPayment);

        response.put("status", "success");
        response.put("message", "Pago creado correctamente");
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
        return paymentRepository.findByUserOrderByCreatedAtDesc(currentUser);
    }

    @PostMapping("/mark-paid/{orderId}")
    @PreAuthorize("hasRole('USER')")
    public Map<String, String> markPaymentAsPaid(@AuthenticationPrincipal CustomUserDetails currentUserDetails,
                                                 @PathVariable String orderId) {
        Map<String, String> response = new HashMap<>();

        if (currentUserDetails == null) {
            response.put("status", "error");
            response.put("message", "Usuario no autenticado");
            return response;
        }

        User currentUser = userRepository.findByUsername(currentUserDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Payment payment = paymentRepository.findFirstByOrderIdOrderByCreatedAtDesc(orderId);
        if (payment == null || !payment.getUser().getId().equals(currentUser.getId())) {
            response.put("status", "error");
            response.put("message", "Pago no encontrado o no autorizado");
            return response;
        }

        payment.setStatus("success");
        paymentRepository.save(payment);

        response.put("status", "success");
        response.put("message", "Pago marcado como completado");
        return response;
    }

    @PostMapping("/update/{paymentId}")
    @PreAuthorize("hasRole('USER')")
    public Map<String, String> updatePayment(@AuthenticationPrincipal CustomUserDetails currentUserDetails,
                                             @PathVariable String paymentId,
                                             @RequestBody(required = false) Map<String, Object> payload) {
        Map<String, String> response = new HashMap<>();

        if (currentUserDetails == null) {
            response.put("status", "error");
            response.put("message", "Usuario no autenticado");
            return response;
        }

        User currentUser = userRepository.findByUsername(currentUserDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Payment payment = paymentRepository.findByPaymentId(paymentId);
        if (payment == null) {
            try {
                Long recordId = Long.parseLong(paymentId);
                payment = paymentRepository.findById(recordId).orElse(null);
            } catch (NumberFormatException ignored) {
                payment = null;
            }
        }

        if (payment == null || !payment.getUser().getId().equals(currentUser.getId())) {
            response.put("status", "error");
            response.put("message", "Pago no encontrado o no autorizado");
            return response;
        }

        if (payload != null && payload.containsKey("stripePaymentId")) {
            payment.setPaymentId(payload.get("stripePaymentId").toString());
        }
        payment.setStatus("success");
        paymentRepository.save(payment);

        response.put("status", "success");
        response.put("message", "Pago actualizado correctamente");
        return response;
    }
}