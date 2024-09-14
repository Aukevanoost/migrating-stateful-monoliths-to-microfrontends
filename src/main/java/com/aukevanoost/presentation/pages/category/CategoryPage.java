package com.aukevanoost.presentation.pages.category;

import com.aukevanoost.domain.entities.Category;
import com.aukevanoost.domain.entities.Product;
import com.aukevanoost.interfaces.boundaries.category.CategoryFilter;
import com.aukevanoost.interfaces.boundaries.category.ICategoryController;
import com.aukevanoost.interfaces.boundaries.category.CategoryViewModel;
import com.aukevanoost.presentation.components.cards.ProductCardPanel;
import com.aukevanoost.presentation.template.BaseTemplate;
import jakarta.inject.Inject;
import org.apache.wicket.AttributeModifier;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.ExternalLink;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.markup.html.panel.Fragment;
import org.apache.wicket.markup.repeater.RepeatingView;
import org.apache.wicket.model.Model;
import org.apache.wicket.request.mapper.parameter.PageParameters;

import java.util.Comparator;

public class CategoryPage extends BaseTemplate {
    @Inject
    private ICategoryController controller;

    private CategoryViewModel viewmodel;

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
            add(new Label("title", c.getName()));

            buildCategoryFilter(c);

            var sortedProducts = c.getProducts()
                .stream()
                .sorted(Comparator.comparingInt(Product::getStartPrice).reversed())
                .toList();

            RepeatingView productCards = new RepeatingView("productCards");
            sortedProducts.forEach(p -> productCards.add(
                new ProductCardPanel(
                    productCards.newChildId(),
                    p.getName(),
                    p.getUrl(),
                    p.getImage(),
                    p.getStartPrice()
                )
            ));
            add(productCards);
        });
    }

    private void buildCategoryFilter(Category c) {
        WebMarkupContainer actionsContainer = new WebMarkupContainer("actionsContainer");
        actionsContainer.add(new Label("productsSize", c.getProducts().size()));

        RepeatingView filterCards = new RepeatingView("filterCards");
        this.viewmodel.filters().forEach(f -> filterCards.add(
           new CategoryFilterPanel(
               filterCards.newChildId(),
               f.name(),
               f.url(),
               f.active()
           )
        ));
        actionsContainer.add(filterCards);
        add(actionsContainer);
    }
}