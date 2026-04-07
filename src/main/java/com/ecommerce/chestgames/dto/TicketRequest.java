package com.ecommerce.chestgames.dto;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class TicketRequest {
    private String email;
    private String orderId;
    private String subject;
    private String description;
    private List<MultipartFile> attachments;

    // Getters y Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<MultipartFile> getAttachments() { return attachments; }
    public void setAttachments(List<MultipartFile> attachments) { this.attachments = attachments; }
}