package com.ecommerce.chestgames.service;

import org.springframework.stereotype.Service;

@Service
public class EmailTemplateService {

    private String baseTemplate(String title, String content) {
        return """
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>%s</title>
            </head>

            <body style="margin:0;padding:0;background-color:#0f172a;
                         font-family:Arial,sans-serif;color:#e2e8f0;">

                <table width="100%%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
                    <tr>
                        <td align="center">

                            <table width="600" cellpadding="0" cellspacing="0"
                                   style="background:#1e293b;border-radius:16px;
                                   overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.4);">

                                <!-- HEADER -->
                                <tr>
                                    <td align="center"
                                        style="background:linear-gradient(135deg,#7c3aed,#2563eb);
                                        padding:30px;">
                                        <h1 style="margin:0;color:white;font-size:32px;">
                                            🎮 ChestGames
                                        </h1>
                                    </td>
                                </tr>

                                <!-- CONTENT -->
                                <tr>
                                    <td style="padding:40px;line-height:1.7;color:#cbd5e1;">
                                        %s
                                    </td>
                                </tr>

                                <!-- FOOTER -->
                                <tr>
                                    <td align="center"
                                        style="padding:20px;background:#0f172a;
                                        color:#94a3b8;font-size:13px;">
                                        © 2026 ChestGames · Todos los derechos reservados
                                    </td>
                                </tr>

                            </table>

                        </td>
                    </tr>
                </table>

            </body>
            </html>
            """.formatted(title, content);
    }

    public EmailTemplate welcomeTemplate(String username) {

        String subject = "🎉 Bienvenido a ChestGames";

        String content = """
            <h2 style="color:#fff;">Hola %s 👋</h2>

            <p>Gracias por registrarte en <strong>ChestGames</strong>.
            Nos alegra tenerte en nuestra comunidad de jugadores.</p>

            <p>Ya puedes descubrir ofertas exclusivas, nuevas colecciones
            y tus juegos favoritos.</p>

            <div style="text-align:center;margin:40px 0;">
                <a href="https://chestgames.com"
                   style="background:#7c3aed;color:white;
                   padding:14px 28px;text-decoration:none;
                   border-radius:10px;font-weight:bold;display:inline-block;">
                   Explorar tienda
                </a>
            </div>

            <p>Si tienes cualquier duda, nuestro equipo de soporte estará encantado de ayudarte.</p>

            <p style="margin-top:30px;">¡Bienvenido a la aventura! 🚀</p>

            <p>— El equipo de ChestGames</p>
            """.formatted(username);

        return new EmailTemplate(subject, baseTemplate(subject, content));
    }

    public EmailTemplate twoFactorActivatedTemplate(String username) {

        String subject = "🔐 2FA activada correctamente";

        String content = """
            <h2 style="color:#fff;">Hola %s </h2>

            <p>La autenticación de dos factores (2FA) ha sido activada correctamente en tu cuenta.</p>

            <div style="background:#0f766e;padding:20px;
                        border-radius:12px;margin:30px 0;color:white;">
                ✅ Tu cuenta ahora cuenta con una capa extra de seguridad.
            </div>

            <p>A partir de ahora necesitarás tu código 2FA al iniciar sesión
            para proteger tus datos y tus compras.</p>

            <p style="color:#fca5a5;">
                Si no has realizado esta acción, contacta con soporte inmediatamente.
            </p>

            <p>Gracias por reforzar la seguridad de tu cuenta.</p>

            <p>— El equipo de ChestGames</p>
            """.formatted(username);

        return new EmailTemplate(subject, baseTemplate(subject, content));
    }

    public EmailTemplate paymentCompletedTemplate(
            String username,
            String productName,
            String orderId,
            String downloadLink
    ) {

        String subject = "✅ Pago completado";

        String content = """
            <h2 style="color:#fff;">Hola %s 🎉</h2>

            <p>¡Gracias por tu compra! El pago se ha completado correctamente.</p>

            <table width="100%%"
                   style="margin:30px 0;background:#0f172a;
                   border-radius:12px;padding:20px;color:white;">

                <tr>
                    <td style="padding:8px 0;color:#94a3b8;">Producto</td>
                    <td style="padding:8px 0;text-align:right;">%s</td>
                </tr>

                <tr>
                    <td style="padding:8px 0;color:#94a3b8;">Pedido</td>
                    <td style="padding:8px 0;text-align:right;">%s</td>
                </tr>

            </table>

            <div style="text-align:center;margin:40px 0;">
                <a href="%s"
                   style="background:#2563eb;color:white;
                   padding:16px 30px;text-decoration:none;
                   border-radius:10px;font-weight:bold;display:inline-block;">
                   Descargar juego
                </a>
            </div>

            <p>Si tienes problemas con la descarga, contacta con soporte.</p>

            <p style="margin-top:30px;">¡Disfruta tu juego! 🎮</p>

            <p>— El equipo de ChestGames</p>
            """.formatted(username, productName, orderId, downloadLink);

        return new EmailTemplate(subject, baseTemplate(subject, content));
    }

    public EmailTemplate resetPasswordTemplate(String username, String resetLink) {

        String subject = "🔑 Restablecer contraseña";

        String content = """
        <h2 style="color:#fff;">Hola %s 👋</h2>

        <p>Hemos recibido una solicitud para restablecer tu contraseña de
        <strong>ChestGames</strong>.</p>

        <p>Si no has sido tú quien realizó esta solicitud,
        puedes ignorar este correo de forma segura.</p>

        <div style="text-align:center;margin:40px 0;">
            <a href="%s"
               style="background:#dc2626;color:white;
               padding:16px 30px;text-decoration:none;
               border-radius:10px;font-weight:bold;display:inline-block;">
               Restablecer contraseña
            </a>
        </div>

        <div style="background:#0f172a;
                    border-left:4px solid #f59e0b;
                    padding:18px 20px;
                    border-radius:10px;
                    margin:30px 0;
                    color:#cbd5e1;">

            ⏳ Este enlace expirará en <strong>24 horas</strong>
            por motivos de seguridad.
        </div>

        <p style="color:#fca5a5;">
            Si no solicitaste este cambio, te recomendamos revisar la seguridad
            de tu cuenta inmediatamente.
        </p>

        <p>Si tienes cualquier problema, nuestro equipo de soporte estará encantado de ayudarte.</p>

        <p style="margin-top:30px;">— El equipo de ChestGames</p>
        """.formatted(username, resetLink);

        return new EmailTemplate(subject, baseTemplate(subject, content));
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
