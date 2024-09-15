package com.aukevanoost.domain.entities;

import java.io.Serial;
import java.io.Serializable;

public record Recommendation(
    String name,
    String sku,
    String image,
    Integer[] rgb,
    String url
) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    public static Recommendation fromProduct(
        Product product,
        String variantSKU
    ) {
        var variant = product.variants()
            .stream()
            .filter(v -> v.sku().equals(variantSKU))
            .findFirst()
            .orElseThrow();

        return new Recommendation(
            product.name(),
            variant.sku(),
            variant.image(),
            variant.rgb(),
            String.format("/products/%s?sku=%s", product.sku(), variantSKU)
        );
    }
}
