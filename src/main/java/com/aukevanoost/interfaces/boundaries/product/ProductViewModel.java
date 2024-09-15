package com.aukevanoost.interfaces.boundaries.product;

import com.aukevanoost.interfaces.boundaries.home.dto.RecommendationDTO;
import com.aukevanoost.interfaces.boundaries.product.dto.ProductDTO;
import com.aukevanoost.interfaces.boundaries.product.dto.VariantOptionDTO;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public record ProductViewModel(
    ProductDTO product,
    List<VariantOptionDTO> variantOptions,
    List<RecommendationDTO> recommendations
) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
}