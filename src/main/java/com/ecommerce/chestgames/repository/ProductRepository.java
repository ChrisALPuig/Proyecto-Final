package com.ecommerce.chestgames.repository;

import com.ecommerce.chestgames.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByActiveTrue();

    List<Product> findByPlatformAndActiveTrue(String platform);

    @Query("""
        SELECT p FROM Product p
        JOIN p.categories c
        WHERE c.name = :category
        AND p.active = true
    """)
    List<Product> findByCategory(@Param("category") String category);
}
