package com.aukevanoost.presentation.pages;

import com.aukevanoost.interfaces.boundaries.home.HomeControllerFactory;
import com.aukevanoost.interfaces.boundaries.home.HomeViewModel;
import com.aukevanoost.interfaces.boundaries.home.IHomeController;
import com.aukevanoost.presentation.components.cards.TeaserCardPanel;
import com.aukevanoost.presentation.template.BaseTemplate;
import org.apache.wicket.Component;
import org.apache.wicket.markup.repeater.RepeatingView;
import org.apache.wicket.request.mapper.parameter.PageParameters;

public class ProductsPage extends BaseTemplate {

    public ProductsPage(PageParameters parameters) {
        super(parameters);
    }
}