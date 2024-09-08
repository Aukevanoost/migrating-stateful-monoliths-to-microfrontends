package com.aukevanoost.domain.entities;

public class Recommendation {
    private String name;
    private String sku;
    private String image;
    private Integer[] rgb;
    private String url;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer[] getRgb() {
        return rgb;
    }

    public void setRgb(Integer[] rgb) {
        this.rgb = rgb;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Recommendation(String name, String sku, String image, Integer[] rgb, String url) {
        this.name = name;
        this.sku = sku;
        this.image = image;
        this.rgb = rgb;
        this.url = url;
    }
}
