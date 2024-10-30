package com.aukevanoost.interfaces.boundaries.product;

import com.aukevanoost.domain.boundaries.catalog.CatalogDAOFactory;
import com.aukevanoost.domain.boundaries.catalog.ICatalogDAO;
import com.aukevanoost.domain.boundaries.recommended.RecommendedDAOFactory;
import com.aukevanoost.interfaces.ProductController;
import jakarta.annotation.Nullable;

public interface IProductController {
     ProductViewModel process(String sku, @Nullable String variant);

     static IProductController inject() {
          return new ProductController(
              CatalogDAOFactory.inject(),
              RecommendedDAOFactory.inject()
          );
     }
}
