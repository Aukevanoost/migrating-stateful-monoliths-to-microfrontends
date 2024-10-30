package com.aukevanoost.domain.dao.mock;

import com.aukevanoost.domain.boundaries.ICatalogDAO;
import com.aukevanoost.domain.dao.mock.db.Categories;
import com.aukevanoost.domain.dao.mock.db.Products;
import com.aukevanoost.domain.entities.Category;
import com.aukevanoost.domain.entities.Product;
import jakarta.enterprise.context.RequestScoped;

import java.util.Optional;
import java.util.stream.Stream;

public class MockCatalogDAO implements ICatalogDAO {
    @Override
    public Optional<Category> getProductsByCategory(String key) {
        return Optional.of(Categories.ALL.get(key));
    }

    @Override
    public Optional<Product> getProductBySKU(String sku) {
        return Optional.of(Products.ALL.get(sku));
    }

    @Override
    public Stream<Product> getAllProducts() {
        return Products.stream();
    }

    @Override
    public Stream<Category> getAllCategories() {
        return Categories.stream();
    }


}
