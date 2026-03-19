package com.ecommerce.chestgames.entity;

import com.ecommerce.chestgames.entity.User;
import jakarta.persistence.*;
import java.util.Set;

@Entity
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación ManyToOne con el usuario
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // Relación ManyToMany con los juegos
    @ManyToMany
    @JoinTable(
            name = "wishlist_games",
            joinColumns = @JoinColumn(name = "wishlist_id"),
            inverseJoinColumns = @JoinColumn(name = "game_id")
    )
    private Set<Game> games;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Set<Game> getGames() { return games; }
    public void setGames(Set<Game> games) { this.games = games; }
}