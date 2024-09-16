package com.aukevanoost.presentation.pages.home;

import com.aukevanoost.interfaces.boundaries.home.HomeViewModel;
import com.aukevanoost.interfaces.boundaries.home.IHomeController;
import com.aukevanoost.presentation.components.cards.RecommendationCardPanel;
import com.aukevanoost.presentation.components.cards.TeaserCardPanel;
import com.aukevanoost.presentation.handlers.RepeatingViewHandler;
import com.aukevanoost.presentation.template.BaseTemplate;
import jakarta.inject.Inject;

public class HomePage extends BaseTemplate {
    @Inject
    private transient IHomeController controller;

    private final HomeViewModel vm;

    public HomePage(){
        super();
        vm = controller.process();
    }

    protected void onInitialize() {
        super.onInitialize();

        add(RepeatingViewHandler.asCards(
            "teaserCards",
            vm.teasers(),
            TeaserCardPanel::new
        ));

        add(RepeatingViewHandler.asCards(
            "recommendationCards",
            vm.recommended(),
            RecommendationCardPanel::new
        ));
    }
}