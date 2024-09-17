package com.aukevanoost.presentation.components.cards;

import com.aukevanoost.interfaces.boundaries._dto.StoreDTO;
import com.aukevanoost.interfaces.boundaries._dto.TeaserDTO;
import com.aukevanoost.presentation.components.ImagePanel;
import com.aukevanoost.presentation.pages.category.CategoryPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.panel.GenericPanel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.request.mapper.parameter.PageParameters;

public class TeaserCardPanel extends GenericPanel<TeaserDTO> {

    public TeaserCardPanel(String id, IModel<TeaserDTO> teaser) {
        super(id, teaser);
    }

    @Override
    protected void onInitialize() {
        super.onInitialize();

        Link<String> link = new Link<>("url", PropertyModel.of(getModel(), TeaserDTO.KEY)){
            @Override
            public void onClick() {
                setResponsePage(
                    CategoryPage.class,
                    new PageParameters().add("category", getModelObject()));
            }
        };

        link.add(new Label(TeaserDTO.TITLE, PropertyModel.of(getModel(), TeaserDTO.TITLE)));
        link.add(new ImagePanel(TeaserDTO.IMAGE, PropertyModel.of(getModel(), TeaserDTO.IMAGE), 500, 1000));

        add(link);
    }
}

