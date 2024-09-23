package com.aukevanoost.interfaces.boundaries._dto;

import com.aukevanoost.domain.entities.Product;
import com.aukevanoost.domain.entities.ProductVariant;

import java.io.Serial;
import java.io.Serializable;

public record ProductPreviewDTO(
    String sku,
    String name,
    String image,
    Integer startPrice
) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    public static ProductPreviewDTO from(Product product) {
        var firstVariant = product.variants$().findFirst().orElseThrow();

        return new ProductPreviewDTO(
            product.sku(),
            product.name(),
            firstVariant.image(),
            product.variants$()
                .map(ProductVariant::price)
                .min(Integer::compareTo)
                .orElse(0)
        );
    }
}
