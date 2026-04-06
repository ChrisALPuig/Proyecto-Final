package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.dto.FormSupportDTO;
import com.ecommerce.chestgames.dto.AttachmentDTO;
import com.ecommerce.chestgames.entity.Attachment;
import com.ecommerce.chestgames.entity.SupportMessage;
import com.ecommerce.chestgames.entity.SupportRequest;
import com.ecommerce.chestgames.entity.SupportStatus;
import com.ecommerce.chestgames.entity.User;
import com.ecommerce.chestgames.repository.UserRepository;
import com.ecommerce.chestgames.service.SupportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/support")
@CrossOrigin(origins = "*")
public class SupportController {

    @Autowired
    private SupportService supportService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public SupportRequest submitSupport(
            @RequestBody FormSupportDTO request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        SupportRequest support = new SupportRequest();
        support.setEmail(request.getEmail());
        support.setOrderId(request.getOrderId());
        support.setSubject(request.getSubject());
        support.setDescription(request.getDescription());

        // Convertir Base64 a byte[] antes de guardar
        List<Attachment> entityAttachments = request.getAttachments().stream().map(dto -> {
            Attachment a = new Attachment();
            a.setName(dto.getName());
            a.setType(dto.getType());
            a.setData(Base64.getDecoder().decode(dto.getData()));
            return a;
        }).toList();

        support.setAttachments(entityAttachments);
        support.setStatus(SupportStatus.OPEN);

        // Asociar al usuario logueado
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        support.setUser(user);

        // Asignar soporte a attachments
        entityAttachments.forEach(att -> att.setSupportRequest(support));

        supportService.saveRequest(support);

        return support;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<SupportRequest> getAllSupportRequests() {
        return supportService.getAllRequests();
    }

    @GetMapping("/my-tickets")
    public List<SupportRequest> getMyTickets(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return supportService.getRequestsByUser(user);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public SupportRequest updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return supportService.updateStatus(id, body.get("status"));
    }

    @PostMapping("/{id}/reply")
    @PreAuthorize("hasRole('ADMIN')")
    public SupportMessage replyToTicket(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return supportService.addMessage(id, body.get("message"), "ADMIN");
    }

    @GetMapping("/{id}/messages")
    public List<SupportMessage> getMessages(@PathVariable Long id) {
        return supportService.getMessagesBySupportId(id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteSupport(@PathVariable Long id) {
        supportService.softDelete(id);
    }
}