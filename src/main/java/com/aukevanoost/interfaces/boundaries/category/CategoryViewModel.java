package com.aukevanoost.interfaces.boundaries.category;

import com.aukevanoost.interfaces.boundaries._dto.CategoryDTO;
import com.aukevanoost.interfaces.boundaries._dto.CategoryFilterDTO;
import com.aukevanoost.interfaces.boundaries._dto.ProductPreviewDTO;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public record CategoryViewModel(
    CategoryDTO category,
    List<ProductPreviewDTO> products,
    List<CategoryFilterDTO> filters
) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    public static final String CATEGORY = "category";
    public static final String PRODUCTS = "products";
    public static final String FILTERS = "filters";
}
