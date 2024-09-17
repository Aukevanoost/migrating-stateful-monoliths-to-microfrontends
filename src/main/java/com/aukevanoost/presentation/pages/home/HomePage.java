package com.aukevanoost.presentation.pages.home;

import com.aukevanoost.interfaces.boundaries._dto.TeaserDTO;
import com.aukevanoost.interfaces.boundaries.home.HomeViewModel;
import com.aukevanoost.interfaces.boundaries.home.IHomeController;
import com.aukevanoost.presentation.components.cards.RecommendationCardPanel;
import com.aukevanoost.presentation.components.cards.TeaserCardPanel;
import com.aukevanoost.presentation.handlers.ListViewHandler;
import com.aukevanoost.presentation.template.BaseTemplate;
import jakarta.inject.Inject;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.PropertyModel;
import org.danekja.java.util.function.serializable.SerializableBiFunction;

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
            PropertyModel.of(vm, HomeViewModel.TEASERS),
            TeaserCardPanel::new
        ));

        add(ListViewHandler.asPanel(
            "recommendationCards",
            PropertyModel.of(vm, HomeViewModel.RECOMMENDATIONS),
            RecommendationCardPanel::new
        ));
    }
}