package com.aukevanoost.presentation.components.cards;

import com.aukevanoost.interfaces.boundaries._dto.RecommendationDTO;
import com.aukevanoost.presentation.components.ImagePanel;
import com.aukevanoost.presentation.pages.product.ProductPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.panel.GenericPanel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.request.mapper.parameter.PageParameters;

public class RecommendationCardPanel extends GenericPanel<RecommendationDTO> {

    public RecommendationCardPanel(String id, IModel<RecommendationDTO> recommendationModel) {
        super(id, recommendationModel);
    }

    protected void onInitialize() {
        super.onInitialize();
        Link<RecommendationDTO> link = new Link<>("url", getModel()) {
            @Override
            public void onClick() {
                setResponsePage(
                    ProductPage.class,
                    new PageParameters()
                        .add("product", this.getModelObject().productSku())
                        .add("variant", this.getModelObject().sku())
                );
            }
        };
        link
            .add(new Label(RecommendationDTO.NAME,PropertyModel.of(getModel(), RecommendationDTO.NAME)))
            .add(new ImagePanel(RecommendationDTO.IMAGE, PropertyModel.of(getModel(), RecommendationDTO.IMAGE), 200, 400));
        add(link);
    }
}
