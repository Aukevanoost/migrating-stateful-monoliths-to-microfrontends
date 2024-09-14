package com.aukevanoost.presentation.pages.home;

import com.aukevanoost.interfaces.boundaries.home.dto.RecommendationDTO;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.image.ExternalImage;
import org.apache.wicket.markup.html.link.ExternalLink;
import org.apache.wicket.markup.html.panel.Panel;

import java.util.List;

public class RecommendationCardPanel extends Panel {

    private final RecommendationDTO recommendation;

    public RecommendationCardPanel(String id, RecommendationDTO recommendation) {
        super(id);
        this.recommendation = recommendation;
    }

    protected void onInitialize() {
        super.onInitialize();
        ExternalLink link = new ExternalLink("url", recommendation.url());
        link.add(new Label("name", recommendation.name()));
        link.add(
            new ExternalImage(
                "image",
                getImageSize(recommendation.image(), 200),
                List.of(
                    getImageSrcSet(recommendation.image(), 200),
                    getImageSrcSet(recommendation.image(), 400)
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

    public static RecommendationCardPanel from(String id, RecommendationDTO dto) {
        return new RecommendationCardPanel(id, dto);
    }
}
