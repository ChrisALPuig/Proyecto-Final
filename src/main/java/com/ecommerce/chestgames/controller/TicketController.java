package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.entity.Ticket;
import com.ecommerce.chestgames.service.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:8100") // Para Ionic
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createTicket(
            @RequestParam String email,
            @RequestParam(required = false) String orderId,
            @RequestParam String subject,
            @RequestParam String description,
            @RequestParam(required = false) List<MultipartFile> attachments
    ) {
        try {
            Ticket ticket = ticketService.createTicket(email, orderId, subject, description, attachments);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "ticket", ticket
            ));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                    "success", false,
                    "message", "Error al guardar el ticket"
            ));
        }
    }
}