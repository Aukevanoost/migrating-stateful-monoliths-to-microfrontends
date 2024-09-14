package com.aukevanoost.presentation.pages.category;

import com.aukevanoost.interfaces.boundaries.category.dto.CategoryDTO;
import com.aukevanoost.interfaces.boundaries.category.ICategoryController;
import com.aukevanoost.interfaces.boundaries.category.CategoryViewModel;
import com.aukevanoost.interfaces.boundaries.category.dto.ProductDTO;
import com.aukevanoost.presentation.components.ProductCardPanel;
import com.aukevanoost.presentation.template.BaseTemplate;
import jakarta.inject.Inject;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.repeater.RepeatingView;
import org.apache.wicket.request.mapper.parameter.PageParameters;

import java.util.Comparator;

public class CategoryPage extends BaseTemplate {
    @Inject
    private ICategoryController controller;

    private final CategoryViewModel viewmodel;

    public CategoryPage() {
        super();
        this.viewmodel = this.controller.process();
    }

    public CategoryPage(PageParameters parameters) {
        super(parameters);
        this.viewmodel = this.controller.process(
            parameters.get("category").toString()
        );
    }

    @Override
    protected void onInitialize() {
        super.onInitialize();

        this.viewmodel.category().ifPresent(c -> {
            add(new Label("title", c.name()));

            buildCategoryFilter(c);

            RepeatingView productCards = new RepeatingView("productCards");

            c.products()
                .stream()
                .sorted(Comparator.comparingInt(ProductDTO::startPrice).reversed())
                .map(p -> new ProductCardPanel(
                    productCards.newChildId(),
                    p.name(),
                    p.url(),
                    p.image(),
                    p.startPrice()
                ))
                .forEach(productCards::add);

            add(productCards);
        });
    }

    private void buildCategoryFilter(CategoryDTO c) {
        WebMarkupContainer actionsContainer = new WebMarkupContainer("actionsContainer");
        actionsContainer.add(new Label("productsSize", c.products().size()));

        RepeatingView filterCards = new RepeatingView("filterCards");
        this.viewmodel.filters()
            .stream()
            .map(f -> new CategoryFilterPanel(filterCards.newChildId(), f))
            .forEach(filterCards::add);

        actionsContainer.add(filterCards);
        add(actionsContainer);
    }
}