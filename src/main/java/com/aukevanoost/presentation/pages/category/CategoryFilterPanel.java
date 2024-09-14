package com.aukevanoost.presentation.pages.category;

import org.apache.wicket.AttributeModifier;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.ExternalLink;
import org.apache.wicket.markup.html.panel.Fragment;
import org.apache.wicket.markup.html.panel.Panel;

public class CategoryFilterPanel extends Panel {
    private final String name;
    private final String url;
    private final Boolean active;

    public CategoryFilterPanel(String id, String name, String url, Boolean active) {
        super(id);
        this.name = name;
        this.url = url;
        this.active = active;
    }

    protected void onInitialize() {
        super.onInitialize();
        Fragment fragment;
        if (active) {
            add(new AttributeModifier("class", "e_Filter__filter--active"));
            fragment = new Fragment("filterContainer", "activeFilter", this);
            fragment.setRenderBodyOnly(true);
            fragment.add(new Label("category", name));
        } else {
            fragment = new Fragment("filterContainer", "inactiveFilter", this);
            fragment.setRenderBodyOnly(true);
            ExternalLink link = new ExternalLink("link", url);
            link.add(new Label("category", name));
            fragment.add(link);
        }
        add(fragment);
    }
}
