package com.aukevanoost.presentation.pages.home;

import com.aukevanoost.interfaces.boundaries.home.HomeViewModel;
import com.aukevanoost.interfaces.boundaries.home.IHomeController;
import com.aukevanoost.presentation.components.RecommendationCardPanel;
import com.aukevanoost.presentation.template.BaseTemplate;
import jakarta.inject.Inject;
import org.apache.wicket.markup.repeater.RepeatingView;

public class HomePage extends BaseTemplate {
    @Inject
    private transient IHomeController controller;

    private final HomeViewModel vm;

    public HomePage(){
        super();
        vm = controller.process();
    }

    protected void onInitialize() {
        RepeatingView teaserCards = new RepeatingView("teaserCards");
        vm.teasers()
            .stream()
            .map(teaser -> new TeaserCardPanel(teaserCards.newChildId(), teaser))
            .forEach(teaserCards::add);
        add(teaserCards);

        RepeatingView recommendationCards = new RepeatingView("recommendationCards");
        vm.recommended()
            .stream()
            .map(r -> new RecommendationCardPanel(
                recommendationCards.newChildId(),
                r.name(), r.image(), r.url()
            ))
            .forEach(recommendationCards::add);
        add(recommendationCards);

        super.onInitialize();
    }
}