package com.ecommerce.chestgames.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String orderId;
    private String subject;
    private String description;

    @ElementCollection
    private List<String> attachmentUrls; // Guardaremos la URL o nombre del archivo

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getAttachmentUrls() { return attachmentUrls; }
    public void setAttachmentUrls(List<String> attachmentUrls) { this.attachmentUrls = attachmentUrls; }
}