package com.aukevanoost.interfaces.boundaries.category;

import com.aukevanoost.interfaces.boundaries.category.dto.CategoryDTO;
import com.aukevanoost.interfaces.boundaries.category.dto.CategoryFilterDTO;
import com.aukevanoost.interfaces.boundaries.category.dto.ProductDTO;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public record CategoryViewModel(
    CategoryDTO category,
    List<ProductDTO> products,
    List<CategoryFilterDTO> filters
) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
}
