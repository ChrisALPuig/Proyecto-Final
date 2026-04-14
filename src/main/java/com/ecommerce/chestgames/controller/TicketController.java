package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.entity.Ticket;
import com.ecommerce.chestgames.entity.User;
import com.ecommerce.chestgames.repository.UserRepository;
import com.ecommerce.chestgames.service.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = {"http://localhost:8100", "http://localhost:5173", "http://localhost:3000"}) // Permitir frontends locales
public class TicketController {

    private final TicketService ticketService;
    private final UserRepository userRepository;

    public TicketController(TicketService ticketService, UserRepository userRepository) {
        this.ticketService = ticketService;
        this.userRepository = userRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createTicket(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam String email,
            @RequestParam(required = false) String orderId,
            @RequestParam String subject,
            @RequestParam String description,
            @RequestParam(required = false) List<MultipartFile> attachments
    ) {
        try {
            if (userDetails == null) {
                return ResponseEntity.status(401).body(Map.of(
                        "success", false,
                        "message", "No autorizado"
                ));
            }

            User user = userRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            Ticket ticket = ticketService.createTicket(user.getId(), email, orderId, subject, description, attachments);
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
    @GetMapping("/admin/all")
    public ResponseEntity<?> getAllTickets() {
        try {
            List<Ticket> tickets = ticketService.getAllTickets();
            return ResponseEntity.ok(tickets);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyTickets(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) String orderId
    ) {
        try {
            if (userDetails == null) {
                return ResponseEntity.status(401).body("No autorizado");
            }

            User user = userRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            List<Ticket> tickets;
            if (orderId != null && !orderId.isEmpty()) {
                tickets = ticketService.getTicketsByUserIdAndOrderId(user.getId(), orderId);
            } else {
                tickets = ticketService.getTicketsByUserId(user.getId());
            }

            return ResponseEntity.ok(tickets);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTicketById(@PathVariable Long id) {
        try {
            Ticket ticket = ticketService.getTicketById(id);
            return ResponseEntity.ok(ticket);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
    @PostMapping("/{id}/response")
    public ResponseEntity<?> replyToTicket(
            @PathVariable Long id,
            @RequestParam String message,
            @RequestParam String responder
    ) {
        try {
            Ticket updated = ticketService.addResponse(id, message, responder);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateTicketStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        try {
            Ticket updated = ticketService.updateTicketStatus(id, status);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}