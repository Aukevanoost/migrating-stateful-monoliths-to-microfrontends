package com.aukevanoost.interfaces.boundaries.product;

import com.aukevanoost.interfaces.boundaries._dto.RecommendationDTO;
import com.aukevanoost.interfaces.boundaries._dto.ProductDTO;
import com.aukevanoost.interfaces.boundaries._dto.VariantOptionDTO;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import java.util.stream.Stream;

public record ProductViewModel(
    ProductDTO product,
    List<VariantOptionDTO> variantOptions,
    List<RecommendationDTO> recommendations
) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
}
