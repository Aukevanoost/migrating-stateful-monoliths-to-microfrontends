package com.aukevanoost.interfaces.boundaries.home.dto;

import com.aukevanoost.domain.entities.Teaser;

import java.io.Serial;
import java.io.Serializable;

public record TeaserDTO(String title, String image, String key) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    public static TeaserDTO from(Teaser teaser) {
        return new TeaserDTO(teaser.getName(), teaser.getImage(), teaser.getCategory().getKey());
    }
}
