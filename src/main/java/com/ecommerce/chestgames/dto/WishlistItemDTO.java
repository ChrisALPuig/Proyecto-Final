package com.ecommerce.chestgames.dto;


public class WishlistItemDTO {
    private Long id;
    private String name;
    private double price;
    private String image;

    public WishlistItemDTO(Long id, String name, double price, String image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public double getPrice() { return price; }
    public String getImage() { return image; }
}