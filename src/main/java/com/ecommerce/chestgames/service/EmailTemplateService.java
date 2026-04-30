package com.ecommerce.chestgames.service;

import org.springframework.stereotype.Service;

@Service
public class EmailTemplateService {

    public EmailTemplate welcomeTemplate(String username) {
        String subject = "Bienvenido a ChestGames";
        String body = "Hola " + username + ",\n\n" +
                "Gracias por registrarte en ChestGames. Nos alegra tenerte en nuestra comunidad de jugadores. " +
                "Ya puedes empezar a descubrir ofertas, nuevas colecciones y tus juegos favoritos.\n\n" +
                "Si tienes alguna duda, responde este correo o visita nuestro centro de soporte.\n\n" +
                "¡Bienvenido a la aventura!\n" +
                "El equipo de ChestGames";

        return new EmailTemplate(subject, body);
    }

    public EmailTemplate twoFactorActivatedTemplate(String username) {
        String subject = "2FA activada en ChestGames";
        String body = "Hola " + username + ",\n\n" +
                "La autenticación de dos factores (2FA) ha sido activada correctamente en tu cuenta. " +
                "A partir de ahora, necesitarás tu código 2FA al iniciar sesión para proteger tus datos y tus compras.\n\n" +
                "Si no has realizado esta acción, ponte en contacto con nuestro soporte inmediatamente.\n\n" +
                "Gracias por reforzar la seguridad de tu cuenta.\n" +
                "El equipo de ChestGames";

        return new EmailTemplate(subject, body);
    }

    public EmailTemplate paymentCompletedTemplate(String username, String productName, String orderId, String downloadLink) {
        String subject = "Pago completado: tu juego ya está listo para descargar";
        String body = "Hola " + username + ",\n\n" +
                "¡Gracias por tu compra! El pago se ha completado correctamente y ya puedes acceder a tu juego.\n\n" +
                "Producto: " + productName + "\n" +
                "Pedido: " + orderId + "\n\n" +
                "Descarga tu producto y revisa los detalles desde el siguiente enlace:\n" +
                downloadLink + "\n\n" +
                "Si tienes problemas con la descarga, contacta con soporte y estaremos encantados de ayudarte.\n\n" +
                "¡Disfruta tu juego!\n" +
                "El equipo de ChestGames";

        return new EmailTemplate(subject, body);
    }

    public static class EmailTemplate {
        private final String subject;
        private final String body;

        public EmailTemplate(String subject, String body) {
            this.subject = subject;
            this.body = body;
        }

        public String getSubject() {
            return subject;
        }

        public String getBody() {
            return body;
        }
    }
}
