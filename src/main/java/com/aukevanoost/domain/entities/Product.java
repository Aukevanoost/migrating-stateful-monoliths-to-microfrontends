package com.aukevanoost.domain.entities;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public class Product implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String name;
    private String sku;
    private List<ProductVariant> variants;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return sku;
    }

    public void setId(String id) {
        this.sku = id;
    }


    public List<ProductVariant> getVariants() {
        return variants;
    }

    public void setVariants(List<ProductVariant> variants) {
        this.variants = variants;
    }

    public Product(String name, String sku, List<ProductVariant> variants) {
        this.name = name;
        this.sku = sku;
        this.variants = variants;
    }
}
