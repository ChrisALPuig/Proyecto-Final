package com.ecommerce.chestgames.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ecommerce.chestgames.entity.Ticket;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class TicketResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    private String responder; // "USER" o "ADMIN"

    private Date respondedAt;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getResponder() {
        return responder;
    }

    public void setResponder(String responder) {
        this.responder = responder;
    }

    public Date getRespondedAt() {
        return respondedAt;
    }

    public void setRespondedAt(Date respondedAt) {
        this.respondedAt = respondedAt;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }
}