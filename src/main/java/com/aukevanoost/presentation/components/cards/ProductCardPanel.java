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

    public ProductCardPanel(String id, List<Product> products) {
        super(id);

        RepeatingView productCards = new RepeatingView("products");
        products.forEach(r -> {
            var container = new WebMarkupContainer(productCards.newChildId());
            ExternalLink link = new ExternalLink("url", r.getUrl());
            link.add(
                new ExternalImage(
                    "image",
                    getImageSize(r.getImage(), 200),
                    List.of(
                        getImageSrcSet(r.getImage(), 200),
                        getImageSrcSet(r.getImage(), 400),
                        getImageSrcSet(r.getImage(), 800)
                    )
                )
            );
            link.add(new Label("name", r.getName()));
            link.add(new Label("price", convertPrice(r.getStartPrice())));

            container.add(link);
            productCards.add(container);
        });
        add(productCards);
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
