package com.aukevanoost.presentation.components.cards;

import com.aukevanoost.interfaces.boundaries._dto.StoreDTO;
import com.aukevanoost.presentation.components.ImagePanel;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.image.ExternalImage;
import org.apache.wicket.markup.html.panel.Panel;

import java.util.List;

public class StoreCardPanel extends Panel {
    private final StoreDTO store;

    public StoreCardPanel(String id, StoreDTO store) {
        super(id);
        this.store = store;
    }

    protected void onInitialize() {
        super.onInitialize();

        add(new ImagePanel("image", store.image(), 200, 400));
        add(new Label("name", store.name()));
        add(new Label("street", store.street()));
        add(new Label("city", store.city()));
    }

    private String getImageSrcSet(String url, int size) {
        return String.format("%s %dw", this.getImageSize(url, size), size);
    }

    private String getImageSize(String url, int size) {
        return url.replace("[size]", String.valueOf(size));
    }
}


