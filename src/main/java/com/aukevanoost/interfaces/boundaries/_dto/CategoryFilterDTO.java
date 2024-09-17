package com.aukevanoost.interfaces.boundaries._dto;

import com.aukevanoost.domain.entities.Category;

import java.io.Serial;
import java.io.Serializable;

public record CategoryFilterDTO(
    String url,
    String name,
    Boolean active
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    public static CategoryFilterDTO from(String url, String name, Boolean isActive) {
        return new CategoryFilterDTO(url, name, isActive);
    }

    public static CategoryFilterDTO from(Category cat, String url, Boolean isActive) {
        return new CategoryFilterDTO(
            url,
            cat.name(),
            isActive
        );
    }

    public static final String URL = "url";
    public static final String NAME = "name";
    public static final String ACTIVE = "active";
}
