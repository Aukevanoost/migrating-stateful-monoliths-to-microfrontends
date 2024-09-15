package com.aukevanoost.interfaces;

import com.aukevanoost.domain.boundaries.ICatalogDAO;
import com.aukevanoost.interfaces.boundaries.product.IProductController;
import com.aukevanoost.interfaces.boundaries.product.ProductViewModel;
import com.aukevanoost.interfaces.boundaries.product.dto.ProductDTO;
import jakarta.inject.Inject;

public class ProductController implements IProductController {
    @Inject
    private ICatalogDAO catalogDAO;

    public ProductViewModel process(String sku) {
        var product = catalogDAO.getProductBySKU(sku).map(p -> ProductDTO.from(p, sku)).orElseThrow();
        return ProductViewModel.build(product);
    }
}
