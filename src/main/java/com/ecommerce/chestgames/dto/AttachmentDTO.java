package com.ecommerce.chestgames.dto;

public class AttachmentDTO {
    private String name;
    private String type;
    private String data; // Base64

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getData() { return data; }
    public void setData(String data) { this.data = data; }
}