package com.aukevanoost.presentation.layout;

import org.apache.wicket.Component;
import org.apache.wicket.markup.html.panel.Panel;

public class HeaderPanel extends Panel {
    private Component navigationPanel;

    public HeaderPanel(String id) {
        super(id);
        add(navigationPanel = new NavigationPanel("navigationPanel"));
    }
}