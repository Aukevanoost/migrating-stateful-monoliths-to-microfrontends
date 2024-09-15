package com.aukevanoost.interfaces.boundaries.product;

import com.aukevanoost.interfaces.boundaries.product.ProductViewModel;
import jakarta.annotation.Nullable;

public interface IProductController {
     ProductViewModel process(String sku, @Nullable String variant);
}
