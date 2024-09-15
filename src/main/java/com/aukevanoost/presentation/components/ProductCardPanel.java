package com.aukevanoost.presentation.components;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.ExternalLink;
import org.apache.wicket.markup.html.panel.Panel;
import java.text.DecimalFormat;

public class ProductCardPanel extends Panel {

    private final String name;
    private final String url;
    private final String image;
    private final Integer price;

    public ProductCardPanel(String id, String name, String url, String image, Integer price) {
        super(id);
        this.name = name;
        this.url = url;
        this.image = image;
        this.price = price;
    }

    protected void onInitialize() {
        super.onInitialize();
        ExternalLink link = new ExternalLink("url", url);
        link.add(new ImagePanel("image", image, 200, 400, 800));

        link.add(new Label("name", name));
        link.add(new Label("price", convertPrice(price)));
        add(link);
    }

    private String getImageSrcSet(String url, int size) {
        return String.format("%s %dw", this.getImageSize(url, size), size);
    }

    private String getImageSize(String url, int size) {
        return url.replace("[size]", String.valueOf(size));
    }

    private String convertPrice(Integer price) {
        return (new DecimalFormat("##,###.00 Ø")).format(price);
    }
}
