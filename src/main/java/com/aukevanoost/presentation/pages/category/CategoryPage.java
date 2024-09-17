package com.aukevanoost.presentation.pages.category;

import com.aukevanoost.interfaces.boundaries.category.ICategoryController;
import com.aukevanoost.interfaces.boundaries.category.CategoryViewModel;
import com.aukevanoost.presentation.components.cards.ProductCardPanel;
import com.aukevanoost.presentation.handlers.ListViewHandler;
import com.aukevanoost.presentation.template.BaseTemplate;
import jakarta.inject.Inject;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.request.mapper.parameter.PageParameters;

import java.util.List;

public class CategoryPage extends BaseTemplate {
    @Inject
    private transient ICategoryController controller;

    private final IModel<CategoryViewModel> vm;

    public CategoryPage() {
        super();
        vm = Model.of(controller.process());
    }

    public CategoryPage(PageParameters parameters) {
        super(parameters);
        vm = Model.of(
            controller.process(parameters.get("category").toString())
        );
    }

    @Override
    protected void onInitialize() {
        super.onInitialize();

        add(new Label("title", PropertyModel.of(vm, "category.name")));

        WebMarkupContainer actionsContainer = new WebMarkupContainer("actionsContainer");

        actionsContainer.add(new Label("productsSize", vm.map(CategoryViewModel::products).map(List::size)));

        actionsContainer.add(ListViewHandler.asPanel(
            "filterCards",
            PropertyModel.of(vm, CategoryViewModel.FILTERS),
            CategoryFilterPanel::new
        ));

        add(actionsContainer);

        add(ListViewHandler.asPanel(
            "productCards",
            PropertyModel.of(vm, CategoryViewModel.PRODUCTS),
            ProductCardPanel::new
        ));
    }
}