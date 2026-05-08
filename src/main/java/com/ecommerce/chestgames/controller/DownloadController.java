package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.entity.Payment;
import com.ecommerce.chestgames.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/downloads")
public class DownloadController {

    @Autowired
    private PaymentRepository paymentRepository;

    @GetMapping("/game/{orderId}")
    public ResponseEntity<?> downloadGame(@PathVariable String orderId) {
        try {
            // Buscar el pago por orderId
            Payment payment = paymentRepository.findFirstByOrderIdOrderByCreatedAtDesc(orderId);

            if (payment == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Orden no encontrada");
            }

            // Verificar que el pago se completó exitosamente
            if (!"success".equals(payment.getStatus())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("El pago no ha sido completado aún");
            }

            // Obtener el nombre del producto/juego
            String gameName = payment.getProductName();
            if (gameName == null || gameName.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Nombre del juego no disponible");
            }

            // Crear el contenido del archivo .txt
            String fileContent = "Producto comprado: " + gameName + "\n" +
                    "Número de pedido: " + payment.getOrderId() + "\n" +
                    "Monto pagado: €" + payment.getAmount() + "\n" +
                    "Fecha de compra: " + payment.getCreatedAt() + "\n\n" +
                    "¡Gracias por tu compra en ChestGames! 🎮\n" +
                    "Disfruta tu juego.";

            // Crear el nombre del archivo
            String fileName = gameName.replaceAll("[^a-zA-Z0-9._-]", "_") + ".txt";

            // Retornar el archivo como descarga
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                    .header(HttpHeaders.CONTENT_TYPE, "text/plain; charset=UTF-8")
                    .body(fileContent.getBytes());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al descargar el archivo: " + e.getMessage());
        }
    }
}
