package com.aukevanoost.interfaces.boundaries.category.dto;

import com.aukevanoost.domain.entities.Product;
import com.aukevanoost.domain.entities.ProductVariant;

import java.io.Serial;
import java.io.Serializable;

public record ProductDTO(
    String name,
    String image,
    String url,
    Integer startPrice
) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    public static ProductDTO from(Product product) {
        var firstVariant = product.variants$().findFirst().orElseThrow();

        return new ProductDTO(
            product.name(),
            firstVariant.image(),
            String.format("/product/%s", product.sku()),
            product.variants$()
                .map(ProductVariant::price)
                .min(Integer::compareTo)
                .orElse(0)
        );
    }
}
