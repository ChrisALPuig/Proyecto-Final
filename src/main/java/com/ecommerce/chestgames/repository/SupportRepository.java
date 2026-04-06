package com.ecommerce.chestgames.repository;

import com.ecommerce.chestgames.entity.SupportRequest;
import com.ecommerce.chestgames.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupportRepository extends JpaRepository<SupportRequest, Long> {

    List<SupportRequest> findByDeletedFalse();

    List<SupportRequest> findByUserAndDeletedFalse(User user);
}