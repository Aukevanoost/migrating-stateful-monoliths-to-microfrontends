package com.aukevanoost.interfaces.boundaries.category.dto;

import com.aukevanoost.domain.entities.Product;
import com.aukevanoost.domain.entities.ProductVariant;

import java.io.Serializable;

public record ProductDTO(
    String name,
    String image,
    String url,
    Integer startPrice
) implements Serializable {
    private static final long serialVersionUID = 1L;

    public static ProductDTO from(Product product) {
        return new ProductDTO(
            product.getName(),
            product.getVariants().getFirst().getImage(),
            String.format("/product/%s", product.getId()),
            product.getVariants().stream()
                .map(ProductVariant::getPrice)
                .min(Integer::compareTo)
                .orElse(0)
        );
    }
}
