package com.aukevanoost.presentation.pages;

import com.aukevanoost.domain.entities.Recommendation;
import com.aukevanoost.interfaces.boundaries.home.HomeViewModel;
import com.aukevanoost.interfaces.boundaries.home.IHomeController;
import com.aukevanoost.interfaces.boundaries.home.HomeControllerFactory;
import com.aukevanoost.presentation.components.cards.RecommendationCardPanel;
import com.aukevanoost.presentation.components.cards.TeaserCardPanel;
import com.aukevanoost.presentation.template.BaseTemplate;
import org.apache.wicket.Component;
import org.apache.wicket.markup.repeater.RepeatingView;

import java.util.List;
import java.util.stream.Collectors;

public class HomePage extends BaseTemplate {
    private IHomeController controller;
    private HomeViewModel viewmodel;

    public HomePage(){
        super();
        this.controller = HomeControllerFactory.build();
        this.viewmodel = controller.process();

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

        var recommendationsCardPanel = new RecommendationCardPanel("recommendationCards", this.viewmodel.recommended());
        add(recommendationsCardPanel);
//        this.viewmodel.recommended().stream().findFirst().ifPresent(r -> {
//            var recommendationCard = new RecommendationCardPanel(
//                    "recommendationCard",
//                    r.getName(),
//                    r.getUrl(),
//                    r.getImage()
//            );
////            recommendationCard.setRenderBodyOnly(true);
//            add(recommendationCard);
//        });
//        RepeatingView recommendationCards = new RepeatingView("recommendationCards");
//        this.viewmodel.recommended().forEach(r -> {
//            var card = new RecommendationCardPanel(
//                    recommendationCards.newChildId(),
//                    r.getName(),
//                    r.getUrl(),
//                    r.getImage()
//            );
//            card.setRenderBodyOnly(true);
//            recommendationCards.add(card);
//        });
//        recommendationCards.setRenderBodyOnly(true);
//        add(recommendationCards);
    }
}