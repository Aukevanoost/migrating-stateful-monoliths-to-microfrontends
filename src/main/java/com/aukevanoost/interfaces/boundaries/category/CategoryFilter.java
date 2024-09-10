package com.aukevanoost.interfaces.boundaries.category;

public record CategoryFilter(String url, String name, Boolean active) {
    public static CategoryFilter from(String url, String name, Boolean active) {
        return new CategoryFilter(url, name, active);
    }
}
