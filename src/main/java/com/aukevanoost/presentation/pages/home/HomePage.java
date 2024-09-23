package com.aukevanoost.presentation.pages.home;

import com.aukevanoost.interfaces.boundaries.home.HomeViewModel;
import com.aukevanoost.interfaces.boundaries.home.IHomeController;
import com.aukevanoost.presentation.components.cards.RecommendationCardPanel;
import com.aukevanoost.presentation.components.cards.TeaserCardPanel;
import com.aukevanoost.presentation.handlers.ListViewHandler;
import com.aukevanoost.presentation.template.BaseTemplate;
import jakarta.inject.Inject;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.Model;

public class HomePage extends BaseTemplate {
    @Inject
    private transient IHomeController controller;

    private final IModel<HomeViewModel> vm;

    public HomePage(){
        super();
        vm = Model.of(controller.process());
    }

    protected void onInitialize() {
        super.onInitialize();

        add(ListViewHandler.asPanel(
            "teaserCards",
            vm.map(HomeViewModel::teasers),
            TeaserCardPanel::new
        ));

        add(ListViewHandler.asPanel(
            "recommendationCards",
            vm.map(HomeViewModel::recommendations),
            RecommendationCardPanel::new
        ));
    }
}