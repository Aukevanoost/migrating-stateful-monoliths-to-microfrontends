package com.aukevanoost.interfaces.boundaries._dto;

import com.aukevanoost.domain.entities.Product;
import com.aukevanoost.domain.entities.ProductVariant;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public record ProductDTO(
    String sku,
    String name,
    String image,
    String color,
    List<String> highlights
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    public static ProductDTO from(Product product, ProductVariant variant){
        return new ProductDTO(
            product.sku(),
            product.name(),
            variant.image(),
            variant.color(),
            product.highlights()
        );
    }

    public static final String SKU = "sku";
    public static final String NAME = "name";
    public static final String IMAGE = "image";
}
