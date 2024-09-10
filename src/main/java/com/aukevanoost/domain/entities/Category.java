package com.aukevanoost.domain.entities;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public class Category implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String key;
    private String name;
    private List<Product> products;

    public Category(String key, String name, List<Product> products) {
        this.key = key;
        this.name = name;
        this.products = products;
    }

    public List<Product> getProducts() {
        return products;
    }

    public Category setProducts(List<Product> products) {
        this.products = products;
        return this;
    }

    public String getName() {
        return name;
    }

    public Category setName(String name) {
        this.name = name;
        return this;
    }

    public String getKey() {
        return key;
    }

    public Category setKey(String key) {
        this.key = key;
        return this;
    }

    public Category(String key, String name) {
        this(key, name, List.of());
    }
}
