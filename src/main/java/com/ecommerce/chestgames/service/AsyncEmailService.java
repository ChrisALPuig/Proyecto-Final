package com.ecommerce.chestgames.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Servicio para operaciones no críticas en segundo plano
 * Mejora el rendimiento no bloqueando las peticiones HTTP
 */
@Service
@RequiredArgsConstructor
public class AsyncEmailService {
    
    private final EmailService emailService;
    private final EmailTemplateService emailTemplateService;
    
    /**
     * Envía email de bienvenida de forma asíncrona
     * No bloquea la respuesta del registro
     */
    @Async
    public void sendWelcomeEmailAsync(String username, String email) {
        try {
            EmailTemplateService.EmailTemplate template = emailTemplateService.welcomeTemplate(username);
            emailService.sendEmail(email, template.getSubject(), template.getBody());
        } catch (Exception e) {
            // Log pero no bloquear
            System.err.println("Error enviando email de bienvenida: " + e.getMessage());
        }
    }
    
    /**
     * Envía email de confirmación de pago de forma asíncrona
     */
    @Async
    public void sendPaymentConfirmationEmailAsync(
            String username,
            String email,
            String productName,
            String orderId,
            String downloadLink
    ) {
        try {
            EmailTemplateService.EmailTemplate template = emailTemplateService.paymentCompletedTemplate(
                    username, productName, orderId, downloadLink
            );
            emailService.sendEmail(email, template.getSubject(), template.getBody());
        } catch (Exception e) {
            System.err.println("Error enviando email de pago: " + e.getMessage());
        }
    }
    
    /**
     * Envía email de reset de contraseña de forma asíncrona
     */
    @Async
    public void sendResetPasswordEmailAsync(String username, String email, String resetLink) {
        try {
            EmailTemplateService.EmailTemplate template = emailTemplateService.resetPasswordTemplate(
                    username, resetLink
            );
            emailService.sendEmail(email, template.getSubject(), template.getBody());
        } catch (Exception e) {
            System.err.println("Error enviando email de reset: " + e.getMessage());
        }
    }
    
    /**
     * Envía email de confirmación de 2FA de forma asíncrona
     */
    @Async
    public void send2FAConfirmationEmailAsync(String username, String email) {
        try {
            EmailTemplateService.EmailTemplate template = emailTemplateService.twoFactorActivatedTemplate(username);
            emailService.sendEmail(email, template.getSubject(), template.getBody());
        } catch (Exception e) {
            System.err.println("Error enviando email de 2FA: " + e.getMessage());
        }
    }
}
