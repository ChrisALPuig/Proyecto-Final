package com.ecommerce.chestgames.repository;


import com.ecommerce.chestgames.entity.SupportRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupportRepository extends JpaRepository<SupportRequest, Long> {
}