package com.aukevanoost.presentation.pages.category;

import com.aukevanoost.interfaces.boundaries.category.ICategoryController;
import com.aukevanoost.interfaces.boundaries.category.CategoryViewModel;
import com.aukevanoost.interfaces.boundaries._dto.ProductPreviewDTO;
import com.aukevanoost.presentation.components.cards.ProductCardPanel;
import com.aukevanoost.presentation.handlers.RepeatingViewHandler;
import com.aukevanoost.presentation.template.BaseTemplate;
import jakarta.inject.Inject;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.repeater.RepeatingView;
import org.apache.wicket.request.mapper.parameter.PageParameters;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

public class CategoryPage extends BaseTemplate {
    @Inject
    private transient ICategoryController controller;

    private final CategoryViewModel vm;

    public CategoryPage() {
        super();
        vm = controller.process();
    }

    public CategoryPage(PageParameters parameters) {
        super(parameters);
        vm = controller.process(
            parameters.get("category").toString()
        );
    }

    @Override
    protected void onInitialize() {
        super.onInitialize();

        add(new Label("title", vm.category().name()));

        buildCategoryFilter(vm.products());

        add(RepeatingViewHandler.asCards(
            "productCards",
            vm.products(),
            ProductCardPanel::new
        ));
    }

    private void buildCategoryFilter(List<ProductPreviewDTO> products) {
        WebMarkupContainer actionsContainer = new WebMarkupContainer("actionsContainer");

        actionsContainer.add(new Label("productsSize", products.size()));

        actionsContainer.add(RepeatingViewHandler.asCards(
            "filterCards",
            vm.filters(),
            CategoryFilterPanel::new
        ));

        add(actionsContainer);
    }
}