package com.ecommerce.chestgames.entity;

import jakarta.persistence.*;
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

    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    private SupportStatus status;

    private boolean deleted = false;

    @OneToMany(mappedBy = "supportRequest", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SupportMessage> messages;

    @OneToMany(mappedBy = "supportRequest", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Attachment> attachments;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

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

    public SupportStatus getStatus() { return status; }
    public void setStatus(SupportStatus status) { this.status = status; }

    public boolean isDeleted() { return deleted; }
    public void setDeleted(boolean deleted) { this.deleted = deleted; }

    public List<SupportMessage> getMessages() { return messages; }
    public void setMessages(List<SupportMessage> messages) { this.messages = messages; }

    public List<Attachment> getAttachments() { return attachments; }
    public void setAttachments(List<Attachment> attachments) { this.attachments = attachments; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}