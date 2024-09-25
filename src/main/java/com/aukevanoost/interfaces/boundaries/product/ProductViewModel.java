package com.aukevanoost.interfaces.boundaries.product;

import com.aukevanoost.interfaces.boundaries.recommendation.RecommendationDTO;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public record ProductViewModel(
    ProductDTO product,
    CartInfoDTO cartInfo,
    List<VariantOptionDTO> variantOptions,
    List<RecommendationDTO> recommendations
) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
}
