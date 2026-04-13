package com.ecommerce.chestgames.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.chestgames.entity.Payment;
import com.ecommerce.chestgames.entity.User;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // Buscar por PaymentIntent ID
    Payment findByPaymentId(String paymentId);

    // Buscar por Order ID
    Payment findByOrderId(String orderId);

    // Buscar por usuario
    List<Payment> findByUser(User user);
}