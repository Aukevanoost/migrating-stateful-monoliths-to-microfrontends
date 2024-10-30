package com.aukevanoost.interfaces.boundaries.product;

import com.aukevanoost.domain.boundaries.ICatalogDAO;
import com.aukevanoost.domain.boundaries.IRecommendedDAO;
import com.aukevanoost.interfaces.ProductController;
import jakarta.annotation.Nullable;

public interface IProductController {
     ProductViewModel process(String sku, @Nullable String variant);

     static IProductController inject() {
          return new ProductController(
              ICatalogDAO.inject(),
              IRecommendedDAO.inject()
          );
     }
}
