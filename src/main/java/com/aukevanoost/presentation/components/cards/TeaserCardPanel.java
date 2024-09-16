package com.aukevanoost.presentation.components.cards;

import com.aukevanoost.interfaces.boundaries._dto.TeaserDTO;
import com.aukevanoost.presentation.components.ImagePanel;
import com.aukevanoost.presentation.handlers.RepeatingViewHandler;
import com.aukevanoost.presentation.pages.category.CategoryPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.markup.repeater.RepeatingView;
import org.apache.wicket.request.mapper.parameter.PageParameters;

import java.util.List;

public class TeaserCardPanel extends Panel {
    private final TeaserDTO teaser;

    public TeaserCardPanel(String id, TeaserDTO teaser) {
        super(id);
        this.teaser = teaser;
    }

    @Override
    protected void onInitialize() {
        super.onInitialize();
        Link<Void> link = new Link<>("cardUrl") {
            @Override
            public void onClick() {
                setResponsePage(CategoryPage.class, new PageParameters().set(0, teaser.key()));
            }
        };

        link.add(new Label("cardTitle", teaser.title()));
        link.add(new ImagePanel("cardImage", teaser.image(), 500, 1000));

        add(link);
    }

    private String getImageSrcSet(String url, int size) {
        return String.format("%s %dw", this.getImageSize(url, size), size);
    }

    private String getImageSize(String url, int size) {
        return url.replace("[size]", String.valueOf(size));
    }
}

