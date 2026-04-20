package com.ecommerce.chestgames.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class IgdbGameDTO {

    private Long id;
    private String name;
    private String summary;
    private String storyline;

    private String coverUrl;
    private List<String> screenshots;
    private List<String> videos;
    private List<String> genres;
}