package com.aukevanoost.interfaces;

import com.aukevanoost.domain.boundaries.ICatalogDAO;
import com.aukevanoost.interfaces.boundaries.product.IProductController;
import com.aukevanoost.interfaces.boundaries.product.ProductViewModel;
import com.aukevanoost.interfaces.boundaries.product.dto.ProductDTO;
import com.aukevanoost.interfaces.boundaries.product.dto.VariantOptionDTO;
import jakarta.annotation.Nullable;
import jakarta.inject.Inject;

public class ProductController implements IProductController {
    @Inject
    private ICatalogDAO catalogDAO;

    public ProductViewModel process(String productSku, @Nullable String variantSku) {
        var dbProduct = catalogDAO
            .getProductBySKU(productSku)
            .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        var dbActiveVariant = dbProduct.variants$()
            .filter(v -> variantSku == null || v.sku().equals(variantSku))
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("Product variant not found"));

        var product = ProductDTO.from(dbProduct, dbActiveVariant);
        var variants = dbProduct.variants$()
            .map(v -> VariantOptionDTO.from(v, v.sku().equals(dbActiveVariant.sku())))
            .toList();

        return new ProductViewModel(
            product,
            variants
        );
    }
}
