package com.aukevanoost.interfaces.boundaries.product.dto;

import com.aukevanoost.domain.entities.Product;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public record ProductDTO(
    String sku,
    String name,
    String variantName,
    String image,
    List<String> highlights
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    public static ProductDTO from(Product product, String sku) {
        var variant = product.variants$()
            .filter(v -> v.sku().equals(sku))
            .findFirst()
            .orElseThrow();

        return new ProductDTO(
            sku,
            product.name(),
            variant.name(),
            variant.image(),
            product.highlights()
        );
    }

}
