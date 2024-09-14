package com.aukevanoost.interfaces.boundaries.home.dto;

import com.aukevanoost.domain.entities.Teaser;

public record TeaserDTO(String title, String image, String url) {

    public static TeaserDTO from(Teaser teaser) {
        return new TeaserDTO(teaser.getTitle(), teaser.getImage(), teaser.getUrl());
    }
}
