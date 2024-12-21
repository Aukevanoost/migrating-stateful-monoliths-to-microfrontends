package com.aukevanoost.presentation._core.components;

import com.aukevanoost.interfaces.discovery.models.MicroFrontendResponse;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.head.IHeaderResponse;
import org.apache.wicket.markup.head.StringHeaderItem;

import java.io.Serial;

public class RemoteContentPanel extends Panel {
    @Serial
    private static final long serialVersionUID = 1L;
    private final MicroFrontendResponse response;

    public RemoteContentPanel(String id, MicroFrontendResponse response) {
        super(id);
        this.response = response;
        setRenderBodyOnly(true);
    }

    @Override
    protected void onInitialize() {
        super.onInitialize();
        add(new Label("content", response.component() + response.state())
            .setEscapeModelStrings(false)
            .setRenderBodyOnly(true));
    }

    @Override
    public void renderHead(IHeaderResponse response) {
        super.renderHead(response);
        if (this.response.css() != null && !this.response.css().isEmpty()) {
            response.render(StringHeaderItem.forString(this.response.css()));
        }
    }
}