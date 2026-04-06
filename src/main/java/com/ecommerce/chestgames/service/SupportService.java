package com.ecommerce.chestgames.service;

import com.ecommerce.chestgames.entity.SupportMessage;
import com.ecommerce.chestgames.entity.SupportRequest;
import com.ecommerce.chestgames.entity.SupportStatus;
import com.ecommerce.chestgames.entity.User;
import com.ecommerce.chestgames.repository.SupportMessageRepository;
import com.ecommerce.chestgames.repository.SupportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SupportService {

    @Autowired
    private SupportRepository supportRepository;

    @Autowired
    private SupportMessageRepository messageRepository;

    @Transactional
    public SupportRequest saveRequest(SupportRequest request) {
        return supportRepository.save(request);
    }

    @Transactional
    public SupportMessage addMessage(Long supportId, String message, String sender) {
        SupportRequest request = supportRepository.findById(supportId)
                .orElseThrow(() -> new RuntimeException("Ticket no encontrado"));

        if (request.isDeleted()) {
            throw new RuntimeException("No se puede responder un ticket eliminado");
        }

        if (request.getStatus() == SupportStatus.CLOSED) {
            throw new RuntimeException("No se puede responder un ticket cerrado");
        }

        SupportMessage msg = new SupportMessage();
        msg.setSupportRequest(request);
        msg.setMessage(message);
        msg.setSender(sender);
        msg.setCreatedAt(LocalDateTime.now());

        return messageRepository.save(msg);
    }

    // 🔹 NUEVO MÉTODO PARA EL FRONTEND ADMIN
    public List<SupportMessage> getMessagesBySupportId(Long supportId) {
        SupportRequest request = supportRepository.findById(supportId)
                .orElseThrow(() -> new RuntimeException("Ticket no encontrado"));

        if (request.isDeleted()) {
            throw new RuntimeException("No se pueden obtener mensajes de un ticket eliminado");
        }

        return messageRepository.findBySupportRequestId(supportId);
    }

    @Transactional
    public SupportRequest updateStatus(Long id, String status) {
        SupportRequest request = supportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket no encontrado"));

        if (request.isDeleted()) {
            throw new RuntimeException("No se puede actualizar estado de un ticket eliminado");
        }

        SupportStatus newStatus;
        try {
            newStatus = SupportStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Estado inválido: " + status);
        }

        if (request.getStatus() == SupportStatus.CLOSED && newStatus == SupportStatus.CLOSED) {
            return request;
        }

        request.setStatus(newStatus);
        return supportRepository.save(request);
    }

    @Transactional
    public void softDelete(Long id) {
        SupportRequest request = supportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket no encontrado"));

        request.setDeleted(true);
        supportRepository.save(request);
    }

    public List<SupportRequest> getAllRequests() {
        return supportRepository.findByDeletedFalse();
    }

    public List<SupportRequest> getRequestsByUser(User user) {
        return supportRepository.findByUserAndDeletedFalse(user);
    }
}