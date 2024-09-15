package com.aukevanoost.presentation.components;

import com.aukevanoost.interfaces.boundaries.home.dto.RecommendationDTO;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.ExternalLink;
import org.apache.wicket.markup.html.panel.Panel;

public class RecommendationCardPanel extends Panel {

    private final String name;
    private final String image;
    private final String url;


    public RecommendationCardPanel(String id, String name, String image, String url) {
        super(id);
        this.name = name;
        this.image = image;
        this.url = url;
    }

    protected void onInitialize() {
        super.onInitialize();
        ExternalLink link = new ExternalLink("url", url);
        link.add(new Label("name", name));
        link.add(new ImagePanel("image", image, 200, 400));
        add(link);
    }
//
//    public static RecommendationCardPanel from(String id, RecommendationDTO dto) {
//        return new RecommendationCardPanel(id, dto);
//    }
}
