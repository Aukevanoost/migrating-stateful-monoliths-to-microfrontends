package com.aukevanoost.presentation.pages.home;

import com.aukevanoost.interfaces.boundaries.home.HomeViewModel;
import com.aukevanoost.interfaces.boundaries.home.IHomeController;
import com.aukevanoost.presentation.components.cards.RecommendationCardPanel;
import com.aukevanoost.presentation.components.cards.TeaserCardPanel;
import com.aukevanoost.presentation.template.BaseTemplate;
import jakarta.inject.Inject;
import org.apache.wicket.markup.repeater.RepeatingView;

public class HomePage extends BaseTemplate {
    @Inject
    private IHomeController controller;
    private HomeViewModel viewmodel;

    public HomePage(){
        super();
        this.viewmodel = controller.process();
    }

    protected void onInitialize() {
        RepeatingView teaserCards = new RepeatingView("teaserCards");
        this.viewmodel.teasers().forEach(t -> teaserCards.add(
            new TeaserCardPanel(
                teaserCards.newChildId(),
                t.getTitle(),
                t.getUrl(),
                t.getImage()
            )
        ));
        add(teaserCards);

        RepeatingView recommendationCards = new RepeatingView("recommendationCards");
        this.viewmodel.recommended().forEach(r -> recommendationCards.add(
            new RecommendationCardPanel(
                recommendationCards.newChildId(),
                r.getName(),
                r.getImage(),
                r.getUrl()
            )
        ));
        add(recommendationCards);

        super.onInitialize();
    }
}