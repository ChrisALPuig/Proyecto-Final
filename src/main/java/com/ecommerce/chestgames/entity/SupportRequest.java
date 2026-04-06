package com.ecommerce.chestgames.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "support_requests")
public class SupportRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String orderId;
    private String subject;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    private SupportStatus status;

    @ElementCollection
    @CollectionTable(name = "support_attachments", joinColumns = @JoinColumn(name = "support_id"))
    @Column(name = "file_data", columnDefinition = "LONGTEXT")
    private List<String> attachments = new ArrayList<>();

    // getters & setters
    public List<String> getAttachments() { return attachments; }
    public void setAttachments(List<String> attachments) { this.attachments = attachments; }

    public Long getId() { return id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public SupportStatus getStatus() {
        return status;
    }

    public void setStatus(SupportStatus status) {
        this.status = status;
    }

}