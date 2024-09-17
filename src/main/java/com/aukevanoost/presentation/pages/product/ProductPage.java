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
import org.apache.wicket.model.PropertyModel;
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
        add(new ImagePanel("image", PropertyModel.of(vm, "product.image"), 400, 800));

        add(new Label("name", PropertyModel.of(vm, "product.name")));

        add(ListViewHandler.asLabel(
            "productHighlights",
            PropertyModel.of(vm, "product.highlights")
        ));

        add(ListViewHandler.asPanel(
            "variantOptions",
            PropertyModel.of(vm, ProductViewModel.VARIANT_OPTIONS),
            VariantOptionPanel::new
        ));

        add(ListViewHandler.asPanel(
            "recommendationCards",
            PropertyModel.of(vm, ProductViewModel.RECOMMENDATIONS),
            RecommendationCardPanel::new
        ));

    }
}