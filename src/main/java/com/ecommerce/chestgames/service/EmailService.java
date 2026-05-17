package com.ecommerce.chestgames.service;

import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
        logger.info("EmailService inicializado con JavaMailSender");
    }

    public void sendEmail(String to, String subject, String htmlContent) {
        try {
            logger.debug("Preparando email para: {}", to);
            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(
                    message,
                    true,
                    "UTF-8"
            );

            helper.setFrom("rugbygameplays@gmail.com");
            helper.setTo(to);
            helper.setSubject(subject);

            helper.setText(htmlContent, true);

            logger.debug("Enviando email a: {} con asunto: {}", to, subject);
            mailSender.send(message);
            logger.info("Email enviado exitosamente a: {}", to);

        } catch (Exception e) {
            logger.error("FALLO AL ENVIAR EMAIL - Para: {} - Asunto: {} - Error: {}", to, subject, e.getMessage(), e);
            throw new RuntimeException("Error enviando email a: " + to, e);
        }
    }
}
