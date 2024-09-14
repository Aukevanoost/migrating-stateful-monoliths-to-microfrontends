package com.aukevanoost.interfaces.boundaries.home.dto;

import com.aukevanoost.domain.entities.Recommendation;

public record RecommendationDTO(String name, String sku, String image, Integer[] rgb, String url) {

    public static RecommendationDTO from(Recommendation recommendation) {
        return new RecommendationDTO(
            recommendation.getName(),
            recommendation.getSku(),
            recommendation.getImage(),
            recommendation.getRgb(),
            recommendation.getUrl()
        );
    }
}
