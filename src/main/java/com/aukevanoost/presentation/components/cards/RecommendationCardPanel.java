package com.aukevanoost.presentation.components.cards;

import com.aukevanoost.interfaces.boundaries._dto.RecommendationDTO;
import com.aukevanoost.presentation.components.ImagePanel;
import com.aukevanoost.presentation.pages.product.ProductPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.ExternalLink;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.request.mapper.parameter.PageParameters;

public class RecommendationCardPanel extends Panel {

    private final RecommendationDTO recommendation;


    public RecommendationCardPanel(String id, RecommendationDTO recommendation) {
        super(id);
        this.recommendation = recommendation;
    }

    protected void onInitialize() {
        super.onInitialize();
        Link<Void> link = new Link<>("url"){
            @Override
            public void onClick() {
                var params = new PageParameters()
                    .add("product", recommendation.productSku())
                    .add("variant", recommendation.sku());
                setResponsePage(ProductPage.class, params);
            }
        };
        link.add(new Label("name", recommendation.name()));
        link.add(new ImagePanel("image", recommendation.image(), 200, 400));
        add(link);
    }
}
