package com.aukevanoost.interfaces.boundaries.category.dto;

import com.aukevanoost.domain.entities.Category;

import java.io.Serializable;
import java.util.List;

public record CategoryDTO(
    String name,
    String key,
    List<ProductDTO> products
) implements Serializable {
    private static final long serialVersionUID = 1L;

    public static CategoryDTO from(Category category) {
        return new CategoryDTO(
            category.getName(),
            category.getKey(),
            category.getProducts().stream().map(ProductDTO::from).toList()
        );
    }
}
