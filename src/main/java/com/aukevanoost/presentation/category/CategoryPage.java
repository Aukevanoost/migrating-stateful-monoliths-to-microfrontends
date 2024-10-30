package com.aukevanoost.presentation.category;

import com.aukevanoost.interfaces.boundaries.category.ICategoryController;
import com.aukevanoost.interfaces.boundaries.category.CategoryViewModel;
import com.aukevanoost.interfaces.boundaries.product.IProductController;
import com.aukevanoost.presentation.category.components.CategoryFilterPanel;
import com.aukevanoost.presentation.category.components.ProductCardPanel;
import com.aukevanoost.presentation._core.ListViewHandler;
import com.aukevanoost.presentation._core.layout.BaseTemplate;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.request.mapper.parameter.PageParameters;

import java.util.List;

public class CategoryPage extends BaseTemplate {
    private transient ICategoryController controller;

    private final IModel<CategoryViewModel> vm;

    public CategoryPage() {
        super();
        this.controller = ICategoryController.inject();
        vm = Model.of(controller.process());
    }

    public CategoryPage(PageParameters parameters) {
        super(parameters);
        this.controller = ICategoryController.inject();
        vm = Model.of(
            controller.process(parameters.get("category").toString())
        );
    }

    @Override
    protected void onInitialize() {
        super.onInitialize();

        add(new Label("title", vm.map(x -> x.category())));

        WebMarkupContainer actionsContainer = new WebMarkupContainer("actionsContainer");

        actionsContainer.add(new Label("productsSize", vm.map(CategoryViewModel::products).map(List::size)));

        actionsContainer.add(ListViewHandler.asPanel(
            "filterCards",
            vm.map(CategoryViewModel::filters),
            CategoryFilterPanel::new
        ));

        add(actionsContainer);

        add(ListViewHandler.asPanel(
            "productCards",
            vm.map(CategoryViewModel::products),
            ProductCardPanel::new
        ));
    }
}