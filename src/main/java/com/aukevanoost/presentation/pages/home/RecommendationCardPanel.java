package com.aukevanoost.presentation.pages.home;

import com.aukevanoost.interfaces.boundaries.home.dto.RecommendationDTO;
import com.aukevanoost.presentation.components.ImagePanel;
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
        link.add(new ImagePanel("image", recommendation.image(), 200, 400));
        add(link);
    }

    public static RecommendationCardPanel from(String id, RecommendationDTO dto) {
        return new RecommendationCardPanel(id, dto);
    }
}
