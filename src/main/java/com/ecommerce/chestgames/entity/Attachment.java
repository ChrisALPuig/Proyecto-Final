package com.ecommerce.chestgames.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "attachments")
public class Attachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;

    @Lob
    private byte[] data;

    // Asociación opcional a Ticket
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;

    // Asociación opcional a SupportRequest
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "support_request_id")
    private SupportRequest supportRequest;

    // --- Getters y Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public byte[] getData() { return data; }
    public void setData(byte[] data) { this.data = data; }

    public Ticket getTicket() { return ticket; }
    public void setTicket(Ticket ticket) { this.ticket = ticket; }

    public SupportRequest getSupportRequest() { return supportRequest; }
    public void setSupportRequest(SupportRequest supportRequest) { this.supportRequest = supportRequest; }
}