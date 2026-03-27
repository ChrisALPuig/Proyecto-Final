package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.entity.Payment;
import com.ecommerce.chestgames.repository.PaymentRepository;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class StripeWebhookController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    @PostMapping("/webhook")
    public String handleWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        Event event;

        try {
            // Verifica la firma del webhook
            event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
        } catch (SignatureVerificationException e) {
            // Firma inválida
            return "Webhook error: " + e.getMessage();
        }

        // Manejar PaymentIntentSucceeded
        if ("payment_intent.succeeded".equals(event.getType())) {
            PaymentIntent intent = (PaymentIntent) event.getDataObjectDeserializer()
                    .getObject().orElse(null);
            if (intent != null) {
                // Buscar pago en la DB y actualizar
                Payment payment = paymentRepository.findByPaymentId(intent.getId());
                if (payment != null) {
                    payment.setStatus("success");
                    paymentRepository.save(payment);
                }
            }
        }

        return "";
    }
}