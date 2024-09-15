package com.aukevanoost.interfaces;

import com.aukevanoost.domain.boundaries.ICatalogDAO;
import com.aukevanoost.domain.entities.Category;
import com.aukevanoost.interfaces.boundaries.category.*;
import com.aukevanoost.interfaces.boundaries.category.dto.CategoryDTO;
import com.aukevanoost.interfaces.boundaries.category.dto.CategoryFilterDTO;
import com.aukevanoost.interfaces.boundaries.category.dto.ProductDTO;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Stream;

@RequestScoped
public class CategoryController implements ICategoryController {
    private static final String ALL_PRODUCTS_KEY = "all";
    private static final String ALL_PRODUCTS_NAME = "All machines";
    private static final String CATEGORY_BASE_URL = "/products";

    @Inject
    private ICatalogDAO catalogDAO;

    public CategoryViewModel process(String activeCategoryKey) {
        var category = this.catalogDAO.getProductsByCategory(activeCategoryKey)
            .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        var products = category.products$().map(ProductDTO::from).toList();

        var filters = getFilters(activeCategoryKey).toList();

        return CategoryViewModel.build(
            CategoryDTO.from(category),
            products,
            filters
        );
    }

    public CategoryViewModel process() {
        var category = new CategoryDTO(
            ALL_PRODUCTS_NAME,
            ALL_PRODUCTS_KEY
        );

        var products = catalogDAO.getAllProducts().map(ProductDTO::from).toList();

        var filters = getFilters(ALL_PRODUCTS_KEY).toList();

        return CategoryViewModel.build(category, products, filters);
    }

    private Stream<CategoryFilterDTO> getFilters(String activeCategory) {
        return Stream.concat(
            Stream.of(new CategoryFilterDTO(
                CATEGORY_BASE_URL,
                ALL_PRODUCTS_NAME,
                ALL_PRODUCTS_KEY.equals(activeCategory)
            )),
            this.catalogDAO.getAllCategories().map(this.mapToFilter(activeCategory))
        );
    }

    private Function<Category, CategoryFilterDTO> mapToFilter(String activeCategory) {
        return category -> CategoryFilterDTO.from(
            category,
            String.format("%s/%s", CATEGORY_BASE_URL, category.key()),
            category.key().equals(activeCategory)
        );
    }
}
