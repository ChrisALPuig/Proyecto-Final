package com.ecommerce.chestgames.service;

import com.ecommerce.chestgames.entity.Ticket;
import com.ecommerce.chestgames.repository.TicketRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    // Carpeta donde se guardarán los archivos, dentro del proyecto (persistente)
    private final String uploadDir = System.getProperty("user.dir") + "/uploads/";

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;

        // Crear carpeta uploads si no existe
        File uploadPath = new File(uploadDir);
        if (!uploadPath.exists()) {
            boolean created = uploadPath.mkdirs();
            if (!created) {
                System.err.println("No se pudo crear la carpeta de uploads en: " + uploadDir);
            }
        }
    }

    public Ticket createTicket(String email, String orderId, String subject, String description, List<MultipartFile> attachments) throws IOException {
        Ticket ticket = new Ticket();
        ticket.setEmail(email);
        ticket.setOrderId(orderId);
        ticket.setSubject(subject);
        ticket.setDescription(description);

        List<String> attachmentUrls = new ArrayList<>();

        if (attachments != null) {
            for (MultipartFile file : attachments) {
                if (file.isEmpty()) continue;

                // Generar nombre único
                String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                File dest = new File(uploadDir + filename);

                // Guardar archivo en la carpeta uploads
                file.transferTo(dest);

                // Guardamos solo el nombre del archivo, el frontend puede usar /uploads/filename para accederlo
                attachmentUrls.add(filename);
            }
        }

        ticket.setAttachmentUrls(attachmentUrls);

        return ticketRepository.save(ticket);
    }
}