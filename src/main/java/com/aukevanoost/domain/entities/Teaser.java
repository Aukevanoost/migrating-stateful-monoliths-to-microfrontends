package com.aukevanoost.domain.entities;

import java.io.Serial;
import java.io.Serializable;

public class Teaser implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String name;
    private String image;
    private Category category;

    public Teaser(String name, String image, Category category) {
        this.name = name;
        this.image = image;
        this.category = category;
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
