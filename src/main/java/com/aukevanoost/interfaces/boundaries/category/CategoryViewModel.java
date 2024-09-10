package com.aukevanoost.interfaces.boundaries.category;

import com.aukevanoost.domain.entities.Category;

import java.util.List;
import java.util.Optional;

public record CategoryViewModel(Optional<Category> category, List<CategoryFilter> filters) {


    public static CategoryViewModel build(Optional<Category> category, List<CategoryFilter> filters) {
        return new CategoryViewModel(category, filters);
    }
}
