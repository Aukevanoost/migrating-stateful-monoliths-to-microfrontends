package com.aukevanoost.presentation.layout;

import com.aukevanoost.presentation.pages.category.CategoryPage;
import com.aukevanoost.presentation.pages.home.HomePage;
import org.apache.wicket.Component;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.request.mapper.parameter.PageParameters;

public class HeaderPanel extends Panel {
    private Component navigationPanel;

    public HeaderPanel(String id) {
        super(id);
    }

    protected void onInitialize() {
        super.onInitialize();
        add(navigationPanel = new NavigationPanel("navigationPanel"));

        add(
            new Link<>("homeLink"){
                @Override
                public void onClick() {
                    setResponsePage(HomePage.class);
                }
            }
        );
    }
}