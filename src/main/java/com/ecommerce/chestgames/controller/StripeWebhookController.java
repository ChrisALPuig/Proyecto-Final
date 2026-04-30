package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.entity.Payment;
import com.ecommerce.chestgames.repository.PaymentRepository;
import com.ecommerce.chestgames.service.EmailService;
import com.ecommerce.chestgames.service.EmailTemplateService;
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

    @Autowired
    private EmailService emailService;

    @Autowired
    private EmailTemplateService emailTemplateService;

    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    @PostMapping("/webhook")
    public String handleWebhook(@RequestBody String payload,
                                @RequestHeader("Stripe-Signature") String sigHeader) {

        try {
            // Verifica la firma del webhook
            Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);

            if ("payment_intent.succeeded".equals(event.getType())) {
                PaymentIntent intent = (PaymentIntent) event.getDataObjectDeserializer()
                        .getObject().orElse(null);

                if (intent != null) {
                    String orderId = intent.getMetadata().get("orderId");

                    Payment payment = null;

                    // Buscar por orderId primero (tomar el más reciente si hay múltiples)
                    if (orderId != null) {
                        payment = paymentRepository.findFirstByOrderIdOrderByCreatedAtDesc(orderId);
                    }

                    // Fallback: buscar por paymentId
                    if (payment == null) {
                        payment = paymentRepository.findByPaymentId(intent.getId());
                    }

                    if (payment != null) {
                        // ⚡ Solo actualizar paymentId y status si aún no es "success"
                        if (!"success".equals(payment.getStatus())) {
                            payment.setStatus("success");
                        }

                        payment.setPaymentId(intent.getId()); // actualizar paymentId si hace falta

                        // ⚡ No modificar amount (ya está en euros)
                        paymentRepository.save(payment);

                        try {
                            String downloadLink = "http://localhost:3000/user-orders?orderId=" + payment.getOrderId();
                            EmailTemplateService.EmailTemplate template = emailTemplateService.paymentCompletedTemplate(
                                    payment.getUser().getUsername(),
                                    payment.getProductName(),
                                    payment.getOrderId(),
                                    downloadLink
                            );
                            emailService.sendEmail(payment.getUser().getEmail(), template.getSubject(), template.getBody());
                        } catch (Exception ignored) {
                            // No bloquear el webhook si el email fallara.
                        }

                        System.out.println("Pago completado: orderId=" + orderId + ", paymentId=" + intent.getId());
                    } else {
                        System.err.println("Pago no encontrado para PaymentIntent: " + intent.getId());
                    }
                }
            }

            return "success"; // Stripe espera 2xx

        } catch (SignatureVerificationException e) {
            return "Webhook signature verification failed: " + e.getMessage();
        } catch (Exception e) {
            return "Webhook processing error: " + e.getMessage();
        }
    }
}