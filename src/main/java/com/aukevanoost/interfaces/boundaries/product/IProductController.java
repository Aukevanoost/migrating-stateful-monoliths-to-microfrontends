package com.aukevanoost.interfaces.boundaries.product;

import com.aukevanoost.domain.boundaries.ICatalogDAO;
import com.aukevanoost.domain.boundaries.recommended.IRecommendedDAO;
import com.aukevanoost.domain.boundaries.recommended.RecommendedDAOFactory;
import com.aukevanoost.interfaces.ProductController;
import jakarta.annotation.Nullable;

public interface IProductController {
     ProductViewModel process(String sku, @Nullable String variant);

     static IProductController inject() {
          return new ProductController(
              ICatalogDAO.inject(),
              RecommendedDAOFactory.inject()
          );
     }
}
