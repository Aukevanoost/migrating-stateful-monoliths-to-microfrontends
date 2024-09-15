package com.aukevanoost.domain.entities;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import java.util.stream.Stream;

public record Category(
    String key,
    String name,
    List<Product> products
) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    public Category(String key, String name) {
        this(key, name, List.of());
    }

    public Stream<Product> products$() {
        return products.stream();
    }
}