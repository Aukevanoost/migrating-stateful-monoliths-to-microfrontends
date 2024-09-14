package com.aukevanoost.presentation.components.cards;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.image.ExternalImage;
import org.apache.wicket.markup.html.link.ExternalLink;
import org.apache.wicket.markup.html.panel.Panel;

import java.util.List;

public class RecommendationCardPanel extends Panel {

    private final String name;
    private final String img;
    private final String url;

    public RecommendationCardPanel(String id, String name, String img, String url) {
        super(id);
        this.name = name;
        this.img = img;
        this.url = url;
    }

    protected void onInitialize() {
        super.onInitialize();
        ExternalLink link = new ExternalLink("url", url);
        link.add(new Label("name", name));
        link.add(
            new ExternalImage(
                "image",
                getImageSize(img, 200),
                List.of(
                    getImageSrcSet(img, 200),
                    getImageSrcSet(img, 400)
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
