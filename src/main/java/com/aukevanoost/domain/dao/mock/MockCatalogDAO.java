package com.aukevanoost.domain.dao.mock;

import com.aukevanoost.domain.boundaries.catalog.ICatalogDAO;
import com.aukevanoost.domain.dao.mock.db.Categories;
import com.aukevanoost.domain.dao.mock.db.Products;
import com.aukevanoost.domain.entities.Category;
import com.aukevanoost.domain.entities.Product;
import jakarta.enterprise.context.RequestScoped;

import java.util.Optional;
import java.util.stream.Stream;

@RequestScoped
public class MockCatalogDAO implements ICatalogDAO {
    @Override
    public Optional<Category> getProductsByCategory(String category) {
        return Categories.ALL.stream()
                .filter(p -> p.getKey().equals(category))
                .findFirst();
    }

    @Override
    public Stream<Product> getAllProducts() {
        return Products.ALL.values().stream();
    }

    public Stream<Category> getAllCategories() {
        return Categories.ALL.stream().map(c -> new Category(c.getKey(), c.getName()));
    }
}
