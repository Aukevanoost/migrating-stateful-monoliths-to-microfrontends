package com.aukevanoost.presentation.pages.home;

import com.aukevanoost.interfaces.boundaries.home.HomeViewModel;
import com.aukevanoost.interfaces.boundaries.home.IHomeController;
import com.aukevanoost.presentation.template.BaseTemplate;
import jakarta.inject.Inject;
import org.apache.wicket.markup.repeater.RepeatingView;

public class HomePage extends BaseTemplate {
    @Inject
    private transient IHomeController controller;

    private final HomeViewModel viewmodel;

    public HomePage(){
        super();
        this.viewmodel = controller.process();
    }

    protected void onInitialize() {
        RepeatingView teaserCards = new RepeatingView("teaserCards");
        this.viewmodel.teasers()
            .stream()
            .map(teaser -> new TeaserCardPanel(teaserCards.newChildId(), teaser))
            .forEach(teaserCards::add);
        add(teaserCards);

        RepeatingView recommendationCards = new RepeatingView("recommendationCards");
        this.viewmodel.recommended()
            .stream()
            .map(r -> new RecommendationCardPanel(recommendationCards.newChildId(), r))
            .forEach(recommendationCards::add);
        add(recommendationCards);

        super.onInitialize();
    }
}