package com.aukevanoost.presentation.pages.product;

import com.aukevanoost.interfaces.boundaries.product.IProductController;
import com.aukevanoost.interfaces.boundaries.product.ProductViewModel;
import com.aukevanoost.presentation.components.ImagePanel;
import com.aukevanoost.presentation.template.BaseTemplate;
import jakarta.inject.Inject;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.repeater.RepeatingView;
import org.apache.wicket.request.mapper.parameter.PageParameters;

public class ProductPage extends BaseTemplate {
    @Inject
    private transient IProductController controller;

    private final ProductViewModel vm;

    public ProductPage(PageParameters parameters){
        super(parameters);
        vm = this.controller.process(
            parameters.get("product").toString(),
            parameters.get("variant").toString()
        );
    }

    protected void onInitialize() {
        super.onInitialize();
        add(new ImagePanel("image", vm.product().image(), 400, 800));

        add(new Label("productName", vm.product().name()));

        RepeatingView highlights = new RepeatingView("productHighlights");
        vm.product().highlights().forEach(highlight -> {
            highlights.add(new Label(highlights.newChildId(), highlight));
        });
        add(highlights);

        RepeatingView variants = new RepeatingView("variantOptions");
        vm.variantOptions().forEach(variant -> {
            variants.add(new VariantOptionPanel(variants.newChildId(), variant));
        });
        add(variants);

    }
}