package com.aukevanoost.interfaces.boundaries.product;

import com.aukevanoost.domain.entities.Product;
import com.aukevanoost.domain.entities.ProductVariant;

import java.io.Serial;
import java.io.Serializable;

public record CartInfoDTO(
    String sku,
    Integer price,
    Integer inventory
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    public static CartInfoDTO from(Product product, ProductVariant variant){
        return new CartInfoDTO(
            product.sku(),
            variant.price(),
            variant.inventory()
        );
    }
}
