package com.ecommerce.chestgames.repository;

import com.ecommerce.chestgames.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    // Filtrado flexible: rol + username + email
    @Query("SELECT u FROM User u WHERE " +
            "(:username IS NULL OR u.username LIKE %:username%) AND " +
            "(:email IS NULL OR u.email LIKE %:email%) AND " +
            "(:role IS NULL OR EXISTS (SELECT r FROM u.roles r WHERE r.name = :role))")
    Page<User> findUsersByFilters(@Param("username") String username,
                                  @Param("email") String email,
                                  @Param("role") String role,
                                  Pageable pageable);
}
