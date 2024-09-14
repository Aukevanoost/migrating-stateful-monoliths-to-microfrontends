package com.aukevanoost.presentation.pages.home;

import com.aukevanoost.interfaces.boundaries.home.dto.TeaserDTO;
import com.aukevanoost.presentation.pages.category.CategoryPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.image.ExternalImage;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.panel.Panel;
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
        Link<Void> link = new Link<>("cardUrl"){
            @Override
            public void onClick() {
                //we redirect browser to another page.
                setResponsePage(CategoryPage.class, new PageParameters().add("category", teaser.key()));
            }
        };

        link.add(new Label("cardTitle", teaser.title()));

        link.add(
            new ExternalImage(
                "cardImage",
                getImageSize(teaser.image(), 500),
                List.of(
                    getImageSrcSet(teaser.image(), 500),
                    getImageSrcSet(teaser.image(), 1000)
                )
            )
        );
        add(link);
    }

    private String getImageSrcSet(String url, int size) {
        return String.format("%s %dw", this.getImageSize(url, size), size);
    }

    private String getImageSize(String url, int size) {
        return url.replace("[size]", String.valueOf(size));
    }
}
