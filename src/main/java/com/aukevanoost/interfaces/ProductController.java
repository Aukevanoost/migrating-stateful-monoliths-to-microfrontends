package com.aukevanoost.interfaces;

import com.aukevanoost.domain.boundaries.ICatalogDAO;
import com.aukevanoost.domain.boundaries.recommended.IRecommendedDAO;
import com.aukevanoost.interfaces.boundaries.product.*;
import com.aukevanoost.interfaces.boundaries.recommendation.RecommendationDTO;
import jakarta.annotation.Nullable;

public class ProductController implements IProductController {
    private final ICatalogDAO catalogDAO;

    private final IRecommendedDAO recommendedDAO;

    public ProductController(ICatalogDAO catalogDAO, IRecommendedDAO recommendedDAO) {
        this.catalogDAO = catalogDAO;
        this.recommendedDAO = recommendedDAO;
    }

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

        var cartInfo = CartInfoDTO.from(dbProduct, dbActiveVariant);

        var recommendations = recommendedDAO
            .getRecommendations(4, dbActiveVariant.sku())
            .map(RecommendationDTO::from)
            .toList();

        return new ProductViewModel(
            product,
            cartInfo,
            variants,
            recommendations
        );
    }
}
