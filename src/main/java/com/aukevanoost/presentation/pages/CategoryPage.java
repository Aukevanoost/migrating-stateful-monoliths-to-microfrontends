package com.aukevanoost.presentation.pages;

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

            var productCards = new ProductCardPanel("productCards", sortedProducts);
            add(productCards);
        });
    }

    private void buildCategoryFilter(Category c) {
        WebMarkupContainer actionsContainer = new WebMarkupContainer("actionsContainer");
        actionsContainer.add(new Label("productsSize", c.getProducts().size()));

        ListView<CategoryFilter> listView = new ListView<CategoryFilter>("filters", this.viewmodel.filters()) {
            @Override
            protected void populateItem(ListItem<CategoryFilter> item) {
                CategoryFilter currentItem = item.getModelObject();
                Fragment fragment;
                if (currentItem.active()) {
                    item.add(new AttributeModifier("class", "e_Filter__filter--active"));
                    fragment = new Fragment("itemContainer", "activeFilter", CategoryPage.this);
                    fragment.setRenderBodyOnly(true);
                    fragment.add(new Label("category", Model.of(currentItem.name())));
                } else {
                    fragment = new Fragment("itemContainer", "inactiveFilter", CategoryPage.this);
                    fragment.setRenderBodyOnly(true);
                    ExternalLink link = new ExternalLink("link", currentItem.url());
                    link.add(new Label("category", Model.of(currentItem.name())));
                    fragment.add(link);
                }
                item.add(fragment);
            }
        };
        actionsContainer.add(listView);
        add(actionsContainer);
    }
}