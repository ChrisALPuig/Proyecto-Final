package com.ecommerce.chestgames.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.chestgames.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Payment findByPaymentId(String paymentId);
}