package com.aukevanoost.interfaces.boundaries.category;

import com.aukevanoost.interfaces.boundaries.category.dto.CategoryDTO;
import com.aukevanoost.interfaces.boundaries.category.dto.CategoryFilterDTO;

import java.util.List;
import java.util.Optional;

public record CategoryViewModel(Optional<CategoryDTO> category, List<CategoryFilterDTO> filters) {


    public static CategoryViewModel build(Optional<CategoryDTO> category, List<CategoryFilterDTO> filters) {
        return new CategoryViewModel(category, filters);
    }
}
