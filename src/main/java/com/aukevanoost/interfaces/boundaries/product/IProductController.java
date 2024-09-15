package com.aukevanoost.interfaces.boundaries.product;

import com.aukevanoost.interfaces.boundaries.product.ProductViewModel;

public interface IProductController {
     ProductViewModel process(String sku);
}
