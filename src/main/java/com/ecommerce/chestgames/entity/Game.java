package com.ecommerce.chestgames.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Game {

    @Id
    private Long id;

    private String title;
    private String edition;
    private Double price;
    private String coverImage;
    private String trailerVideo;
    private String heroVideo;
    private String descriptionVideo;

    @Lob
    private String description;

    @Lob
    private String story;

    private String systemRequirementsMin;
    private String systemRequirementsRecommended;

    // Inicializamos las listas para evitar null en JSON
    @ElementCollection
    @CollectionTable(name = "game_genres", joinColumns = @JoinColumn(name = "game_id"))
    @Column(name = "genre")
    private List<String> genres = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "game_tags", joinColumns = @JoinColumn(name = "game_id"))
    @Column(name = "tag")
    private List<String> tags = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "game_features", joinColumns = @JoinColumn(name = "game_id"))
    @Column(name = "feature")
    private List<String> features = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "game_images", joinColumns = @JoinColumn(name = "game_id"))
    @Column(name = "image")
    private List<String> images = new ArrayList<>();
}