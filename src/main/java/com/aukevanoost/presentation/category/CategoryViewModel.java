package com.aukevanoost.presentation.category;

import com.aukevanoost.interfaces.boundaries.category.CategoryFilterDTO;
import com.aukevanoost.interfaces.boundaries.category.ICategoryController;
import com.aukevanoost.interfaces.boundaries.category.ProductPreviewDTO;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public record CategoryViewModel(
    String category,
    List<ProductPreviewDTO> products,
    List<CategoryFilterDTO> filters
) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    public static CategoryViewModel from(ICategoryController controller, String activeCategory) {
        return new CategoryViewModel(
            controller.get(activeCategory).name(),
            controller.getProducts(activeCategory).toList(),
            controller.getFilters(activeCategory).toList()
        );
    }
}
