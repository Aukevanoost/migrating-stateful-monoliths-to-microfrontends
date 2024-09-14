package com.aukevanoost.interfaces.boundaries.category.dto;

import com.aukevanoost.domain.entities.Category;

public record CategoryFilterDTO(String url, String name, Boolean active) {
    public static CategoryFilterDTO from(String url, String name, Boolean isActive) {
        return new CategoryFilterDTO(url, name, isActive);
    }

    public static CategoryFilterDTO from(Category cat, String url, Boolean isActive) {
        return new CategoryFilterDTO(
            url,
            cat.getName(),
            isActive
        );
    }
}
