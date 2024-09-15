package com.aukevanoost.domain.boundaries;

import com.aukevanoost.domain.entities.Category;
import com.aukevanoost.domain.entities.Product;

import java.util.Optional;
import java.util.stream.Stream;

public interface ICatalogDAO {
    Optional<Category> getProductsByCategory(String category);
    Optional<Product> getProductBySKU(String sku);
    Stream<Product> getAllProducts();
    Stream<Category> getAllCategories();

}
