package com.ecommerce.chestgames.repository;

import com.ecommerce.chestgames.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByEmail(String email);
    List<Ticket> findByEmailAndOrderId(String email, String orderId);
    List<Ticket> findByUserId(Long userId);
    List<Ticket> findByUserIdAndOrderId(Long userId, String orderId);
}