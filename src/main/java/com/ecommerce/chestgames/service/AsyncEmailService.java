package com.ecommerce.chestgames.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Servicio para operaciones no críticas en segundo plano
 * Mejora el rendimiento no bloqueando las peticiones HTTP
 */
@Service
@RequiredArgsConstructor
public class AsyncEmailService {
    
    private static final Logger logger = LoggerFactory.getLogger(AsyncEmailService.class);
    private final EmailService emailService;
    private final EmailTemplateService emailTemplateService;
    
    /**
     * Envía email de bienvenida de forma asíncrona
     * No bloquea la respuesta del registro
     */
    @Async
    public void sendWelcomeEmailAsync(String username, String email) {
        try {
            logger.info("Iniciando envio de email de bienvenida a: {}", email);
            EmailTemplateService.EmailTemplate template = emailTemplateService.welcomeTemplate(username);
            emailService.sendEmail(email, template.getSubject(), template.getBody());
            logger.info("Email de bienvenida enviado exitosamente a: {}", email);
        } catch (Exception e) {
            logger.error("Error enviando email de bienvenida a: {} - {}", email, e.getMessage(), e);
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
            logger.info("Iniciando envio de email de pago a: {} para orden: {}", email, orderId);
            EmailTemplateService.EmailTemplate template = emailTemplateService.paymentCompletedTemplate(
                    username, productName, orderId, downloadLink
            );
            emailService.sendEmail(email, template.getSubject(), template.getBody());
            logger.info("Email de pago enviado exitosamente a: {}", email);
        } catch (Exception e) {
            logger.error("Error enviando email de pago a: {} - {}", email, e.getMessage(), e);
        }
    }
    
    /**
     * Envía email de reset de contraseña de forma asíncrona
     */
    @Async
    public void sendResetPasswordEmailAsync(String username, String email, String resetLink) {
        try {
            logger.info("Iniciando envio de email de reset de contrasena a: {}", email);
            EmailTemplateService.EmailTemplate template = emailTemplateService.resetPasswordTemplate(
                    username, resetLink
            );
            emailService.sendEmail(email, template.getSubject(), template.getBody());
            logger.info("Email de reset enviado exitosamente a: {}", email);
        } catch (Exception e) {
            logger.error("Error enviando email de reset a: {} - {}", email, e.getMessage(), e);
        }
    }
    
    /**
     * Envía email de confirmación de 2FA de forma asíncrona
     */
    @Async
    public void send2FAConfirmationEmailAsync(String username, String email) {
        try {
            logger.info("Iniciando envio de email de confirmacion 2FA a: {}", email);
            EmailTemplateService.EmailTemplate template = emailTemplateService.twoFactorActivatedTemplate(username);
            emailService.sendEmail(email, template.getSubject(), template.getBody());
            logger.info("Email de 2FA enviado exitosamente a: {}", email);
        } catch (Exception e) {
            logger.error("Error enviando email de 2FA a: {} - {}", email, e.getMessage(), e);
        }
    }
}
