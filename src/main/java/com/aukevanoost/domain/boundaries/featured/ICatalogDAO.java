package com.aukevanoost.domain.boundaries.featured;

import com.aukevanoost.domain.entities.Category;
import com.aukevanoost.domain.entities.Product;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

public interface ICatalogDAO {
    Optional<Category> getProductsByCategory(String category);
    Stream<Product> getAllProducts();
    Stream<Category> getAllCategories();
}
