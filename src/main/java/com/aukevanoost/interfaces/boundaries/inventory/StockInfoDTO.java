package com.aukevanoost.interfaces.boundaries.inventory;

import com.aukevanoost.domain.entities.Product;
import com.aukevanoost.domain.entities.ProductVariant;

import java.io.Serial;
import java.io.Serializable;

public record StockInfoDTO(
    String sku,
    Integer price,
    Integer inventory
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    public static StockInfoDTO from(Product product, ProductVariant variant){
        return new StockInfoDTO(
            variant.sku(),
            variant.price(),
            variant.inventory()
        );
    }
}
