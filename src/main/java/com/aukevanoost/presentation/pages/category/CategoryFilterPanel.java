package com.aukevanoost.presentation.pages.category;

import com.aukevanoost.interfaces.boundaries.category.dto.CategoryFilterDTO;
import org.apache.wicket.AttributeModifier;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.ExternalLink;
import org.apache.wicket.markup.html.panel.Fragment;
import org.apache.wicket.markup.html.panel.Panel;

public class CategoryFilterPanel extends Panel {
    private final CategoryFilterDTO filter;

    public CategoryFilterPanel(String id, CategoryFilterDTO filter) {
        super(id);
        this.filter = filter;
    }

    protected void onInitialize() {
        super.onInitialize();
        Fragment fragment;
        if (filter.active()) {
            add(new AttributeModifier("class", "e_Filter__filter--active"));
            fragment = new Fragment("filterContainer", "activeFilter", this);
            fragment.setRenderBodyOnly(true);
            fragment.add(new Label("category", filter.name()));
        } else {
            fragment = new Fragment("filterContainer", "inactiveFilter", this);
            fragment.setRenderBodyOnly(true);


            ExternalLink link = new ExternalLink("link", filter.url());


            link.add(new Label("category", filter.name()));
            fragment.add(link);
        }
        add(fragment);
    }
}
