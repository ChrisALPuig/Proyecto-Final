package com.ecommerce.chestgames.service;

import com.ecommerce.chestgames.entity.Attachment;
import com.ecommerce.chestgames.entity.Ticket;
import com.ecommerce.chestgames.entity.User;
import com.ecommerce.chestgames.repository.TicketRepository;
import com.ecommerce.chestgames.repository.UserRepository;
import com.ecommerce.chestgames.dto.TicketDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Base64;
import java.util.List;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    public Ticket createTicket(TicketDTO dto, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Ticket ticket = new Ticket();
        ticket.setSubject(dto.getSubject());
        ticket.setDescription(dto.getDescription());
        ticket.setUser(user);

        if (dto.getAttachments() != null && !dto.getAttachments().isEmpty()) {
            List<Attachment> attachments = dto.getAttachments().stream().map(att -> {
                Attachment a = new Attachment();
                a.setName(att.getName());
                a.setType(att.getType());
                a.setData(Base64.getDecoder().decode(att.getData())); // 🔑 decodificar Base64
                return a;
            }).toList();
            ticket.setAttachments(attachments);
        }

        return ticketRepository.save(ticket);
    }

    public List<Ticket> getTicketsByUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return ticketRepository.findByUser(user);
    }
}