package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.dto.FormSupportDTO;
import com.ecommerce.chestgames.entity.SupportRequest;
import com.ecommerce.chestgames.entity.SupportStatus;
import com.ecommerce.chestgames.service.SupportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/support")
@CrossOrigin(origins = "*")
public class SupportController {

    @Autowired
    private SupportService supportService;

    @PostMapping
    public String submitSupport(@RequestBody FormSupportDTO request) {

        SupportRequest support = new SupportRequest();
        support.setEmail(request.getEmail());
        support.setOrderId(request.getOrderId());
        support.setSubject(request.getSubject());
        support.setDescription(request.getDescription());


        support.setAttachments(request.getAttachments());

        support.setStatus(SupportStatus.OPEN);

        supportService.saveRequest(support);

        return "Solicitud enviada correctamente";
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<SupportRequest> getAllSupportRequests() {
        return supportService.getAllRequests();
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public SupportRequest updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return supportService.updateStatus(id, body.get("status"));
    }
}