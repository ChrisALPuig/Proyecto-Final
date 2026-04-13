package com.ecommerce.chestgames.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.chestgames.entity.Payment;
import com.ecommerce.chestgames.entity.User;
import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // Buscar por PaymentIntent ID
    Payment findByPaymentId(String paymentId);

    // Buscar el Payment más reciente por Order ID
    Payment findFirstByOrderIdOrderByCreatedAtDesc(String orderId);

    // Buscar por usuario
    List<Payment> findByUser(User user);
}