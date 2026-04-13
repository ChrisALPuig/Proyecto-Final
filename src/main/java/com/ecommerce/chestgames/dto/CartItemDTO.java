package com.ecommerce.chestgames.dto;

public class CartItemDTO {
    private Long id;
    private String name;
    private double price;
    private String image;
    private int quantity;

    public CartItemDTO(Long id, String name, double price, String image, int quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.quantity = quantity;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public double getPrice() { return price; }
    public String getImage() { return image; }
    public int getQuantity() { return quantity; }
}