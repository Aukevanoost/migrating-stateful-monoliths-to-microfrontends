package com.aukevanoost.domain.boundaries.inventory;

import com.aukevanoost.domain.entities.Product;
import java.util.Optional;

public interface IInventoryDAO {
    Optional<Product> getProductBySKU(String sku);
}
