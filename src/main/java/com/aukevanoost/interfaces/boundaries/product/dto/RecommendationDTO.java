package com.aukevanoost.interfaces.boundaries.product.dto;

import com.aukevanoost.domain.entities.Recommendation;

import java.io.Serial;
import java.io.Serializable;

public record RecommendationDTO(
    String name,
    String image,
    String url
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    public static RecommendationDTO from(Recommendation recommendation) {
        return new RecommendationDTO(
            recommendation.name(),
            recommendation.sku(),
            recommendation.url()
        );
    }
}
