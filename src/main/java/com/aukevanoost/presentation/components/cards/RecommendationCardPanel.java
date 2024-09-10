package com.aukevanoost.presentation.components.cards;

import com.aukevanoost.domain.entities.Recommendation;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.image.ExternalImage;
import org.apache.wicket.markup.html.link.ExternalLink;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.markup.repeater.RepeatingView;

import java.util.List;

public class RecommendationCardPanel extends Panel {

    public RecommendationCardPanel(String id, List<Recommendation> recommendations) {
        super(id);

        RepeatingView recommendationCards = new RepeatingView("recommendation");
        recommendations.forEach(r -> {
            var container = new WebMarkupContainer(recommendationCards.newChildId());
            ExternalLink link = new ExternalLink("url", r.getUrl());
            link.add(new Label("name", r.getName()));
            link.add(
                new ExternalImage(
                    "image",
                    getImageSize(r.getImage(), 200),
                    List.of(
                        getImageSrcSet(r.getImage(), 200),
                        getImageSrcSet(r.getImage(), 400)
                    )
                )
            );
            container.add(link);
            recommendationCards.add(container);
        });
        add(recommendationCards);
    }

    private String getImageSrcSet(String url, int size) {
        return String.format("%s %dw", this.getImageSize(url, size), size);
    }

    private String getImageSize(String url, int size) {
        return url.replace("[size]", String.valueOf(size));
    }
}
