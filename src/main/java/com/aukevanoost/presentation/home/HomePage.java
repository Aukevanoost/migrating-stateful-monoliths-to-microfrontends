package com.aukevanoost.presentation.home;

import com.aukevanoost.interfaces.boundaries.home.HomeViewModel;
import com.aukevanoost.interfaces.boundaries.home.IHomeController;
import com.aukevanoost.presentation.recommendation.RecommendationCardPanel;
import com.aukevanoost.presentation._core.ListViewHandler;
import com.aukevanoost.presentation._core.layout.BaseTemplate;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.Model;

public class HomePage extends BaseTemplate {
    private transient IHomeController controller;

    private final IModel<HomeViewModel> vm;

    public HomePage(){
        super();
        this.controller = IHomeController.inject();
        vm = Model.of(controller.process());
    }

    protected void onInitialize() {
        super.onInitialize();

//        add(ListViewHandler.asPanel(
//            "teaserCards",
//            vm.map(HomeViewModel::teasers),
//            TeaserCardPanel::new
//        ));

        add(ListViewHandler.asPanel(
            "recommendationCards",
            vm.map(HomeViewModel::recommendations),
            RecommendationCardPanel::new
        ));
    }
}