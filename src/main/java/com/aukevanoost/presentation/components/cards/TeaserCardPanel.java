package com.aukevanoost.presentation.components.cards;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.image.ExternalImage;
import org.apache.wicket.markup.html.link.ExternalLink;
import org.apache.wicket.markup.html.panel.Panel;

import java.util.List;

public class TeaserCardPanel extends Panel {

    public TeaserCardPanel(String id, String title, String url, String image) {
        super(id);

        ExternalLink link = new ExternalLink("cardUrl", url);

        link.add(new Label("cardTitle", title));

        link.add(
            new ExternalImage(
                "cardImage",
                getImageSize(image, 500),
                List.of(
                    getImageSrcSet(image, 500),
                    getImageSrcSet(image, 1000)
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
