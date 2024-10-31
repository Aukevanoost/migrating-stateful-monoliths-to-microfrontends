package com.aukevanoost.domain.dao.mock;

import com.aukevanoost.domain.boundaries.inventory.IInventoryDAO;
import com.aukevanoost.domain.dao.mock.db.Products;
import com.aukevanoost.domain.entities.Product;

import java.util.Optional;

public class MockInventoryDAO implements IInventoryDAO {
    @Override
    public Optional<Product> getProductBySKU(String sku) {
        return Optional.of(Products.ALL.get(sku));
    }
}
