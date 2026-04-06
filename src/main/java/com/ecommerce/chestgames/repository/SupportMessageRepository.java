package com.ecommerce.chestgames.repository;

import com.ecommerce.chestgames.entity.SupportMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupportMessageRepository extends JpaRepository<SupportMessage, Long> {
    List<SupportMessage> findBySupportRequestId(Long supportId);
}
