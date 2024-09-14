package com.aukevanoost.domain.entities;

import java.io.Serial;
import java.io.Serializable;
import java.util.stream.IntStream;

public class ProductVariant implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String name;
    private String image;
    private String sku;
    private String color;
    private Integer price;

    public ProductVariant(String name, String image, String sku, String color, Integer price) {
        this.name = name;
        this.image = image;
        this.sku = sku;
        this.color = color;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer[] getRGB() {
        final var OFFSET = 1;
        final var SIZE = 2;
        return IntStream.rangeClosed(0, 2)
            .mapToObj(i -> Integer.parseInt(
                color.substring(
                    OFFSET + (i * SIZE),
                    OFFSET + (i * SIZE) + SIZE
                ),
                16
            ))
            .toArray(Integer[]::new);
    }
}
