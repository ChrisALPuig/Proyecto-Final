package com.ecommerce.chestgames.service;

import com.ecommerce.chestgames.entity.SupportRequest;
import com.ecommerce.chestgames.entity.SupportStatus;
import com.ecommerce.chestgames.repository.SupportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SupportService {

    @Autowired
    private SupportRepository supportRepository;

    @Transactional
    public SupportRequest saveRequest(SupportRequest request) {
        return supportRepository.save(request);
    }

    @Transactional
    public SupportRequest updateStatus(Long id, String status) {
        SupportRequest request = supportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket no encontrado"));

        SupportStatus newStatus;

        try {
            newStatus = SupportStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Estado inválido: " + status);
        }

        request.setStatus(newStatus);

        return supportRepository.save(request);
    }

    public List<SupportRequest> getAllRequests() {
        return supportRepository.findAll();
    }
}