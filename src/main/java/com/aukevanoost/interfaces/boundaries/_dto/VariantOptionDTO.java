package com.aukevanoost.interfaces.boundaries._dto;

import com.aukevanoost.domain.entities.ProductVariant;

import java.io.Serial;
import java.io.Serializable;

public record VariantOptionDTO(
    String sku,
    String name,
    String color,
    boolean active
) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    public static VariantOptionDTO from(ProductVariant variant, boolean isActive) {
        return new VariantOptionDTO(
            variant.sku(),
            variant.name(),
            variant.color(),
            isActive
        );
    }
}
