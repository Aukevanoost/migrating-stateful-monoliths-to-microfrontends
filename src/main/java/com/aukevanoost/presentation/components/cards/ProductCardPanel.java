package com.aukevanoost.presentation.components.cards;

import com.aukevanoost.domain.entities.Product;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.image.ExternalImage;
import org.apache.wicket.markup.html.link.ExternalLink;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.markup.repeater.RepeatingView;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;

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
        link.add(
            new ExternalImage(
                "image",
                getImageSize(image, 200),
                List.of(
                    getImageSrcSet(image, 200),
                    getImageSrcSet(image, 400),
                    getImageSrcSet(image, 800)
                )
            )
        );
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
