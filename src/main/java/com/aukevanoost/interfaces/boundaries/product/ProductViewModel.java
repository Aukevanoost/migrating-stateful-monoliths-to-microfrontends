package com.aukevanoost.interfaces.boundaries.product;

import com.aukevanoost.interfaces.boundaries.product.dto.ProductDTO;

import java.io.Serial;
import java.io.Serializable;

public record ProductViewModel(
    ProductDTO product
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    public static ProductViewModel build(ProductDTO product) {
        return new ProductViewModel(product);
    }
}
