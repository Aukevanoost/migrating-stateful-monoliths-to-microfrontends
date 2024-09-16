package com.aukevanoost.presentation.components.cards;

import com.aukevanoost.interfaces.boundaries._dto.ProductPreviewDTO;
import com.aukevanoost.presentation.components.ImagePanel;
import com.aukevanoost.presentation.pages.product.ProductPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.request.mapper.parameter.PageParameters;

import java.text.DecimalFormat;

public class ProductCardPanel extends Panel {

    private final ProductPreviewDTO product;

    public ProductCardPanel(String id, ProductPreviewDTO product) {
        super(id);
        this.product = product;
    }

    protected void onInitialize() {
        super.onInitialize();

        Link<Void> link = new Link<>("url"){
            @Override
            public void onClick() {
                setResponsePage(
                    ProductPage.class,
                    new PageParameters().add("product", product.sku())
                );
            }
        };
        link.add(new ImagePanel("image", product.image(), 200, 400, 800));

        link.add(new Label("name", product.name()));
        link.add(new Label("price", convertPrice(product.startPrice())));
        add(link);
    }

    private String convertPrice(Integer price) {
        return (new DecimalFormat("##,###.00 Ø")).format(price);
    }
}
