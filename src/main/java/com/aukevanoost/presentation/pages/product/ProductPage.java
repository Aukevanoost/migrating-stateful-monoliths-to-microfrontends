package com.aukevanoost.presentation.pages.product;

import com.aukevanoost.interfaces.boundaries.product.IProductController;
import com.aukevanoost.interfaces.boundaries.product.ProductViewModel;
import com.aukevanoost.presentation.components.ImagePanel;
import com.aukevanoost.presentation.components.cards.RecommendationCardPanel;
import com.aukevanoost.presentation.handlers.ListViewHandler;
import com.aukevanoost.presentation.template.BaseTemplate;
import jakarta.inject.Inject;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.request.mapper.parameter.PageParameters;

public class ProductPage extends BaseTemplate {
    @Inject
    private transient IProductController controller;

    private final IModel<ProductViewModel> vm;

    public ProductPage(PageParameters parameters){
        super(parameters);
        vm = Model.of(
            this.controller.process(
                parameters.get("product").toString(),
                parameters.get("variant").toString()
            )
        );
    }

    protected void onInitialize() {
        super.onInitialize();
        add(new ImagePanel("image", vm.map(x -> x.product().image()), 400, 800));

        add(new Label("name", vm.map(x -> x.product().name())));

        add(ListViewHandler.asLabel(
            "productHighlights",
            vm.map(x -> x.product().highlights())
        ));

        add(ListViewHandler.asPanel(
            "variantOptions",
            vm.map(ProductViewModel::variantOptions),
            VariantOptionPanel::new
        ));

        add(ListViewHandler.asPanel(
            "recommendationCards",
            vm.map(ProductViewModel::recommendations),
            RecommendationCardPanel::new
        ));

    }
}