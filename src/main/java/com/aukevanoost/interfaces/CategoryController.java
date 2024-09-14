package com.aukevanoost.interfaces;

import com.aukevanoost.domain.boundaries.catalog.ICatalogDAO;
import com.aukevanoost.domain.entities.Category;
import com.aukevanoost.interfaces.boundaries.category.CategoryFilter;
import com.aukevanoost.interfaces.boundaries.category.ICategoryController;
import com.aukevanoost.interfaces.boundaries.category.CategoryViewModel;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Stream;

@RequestScoped
public class CategoryController implements ICategoryController {

    @Inject
    private ICatalogDAO catalogDAO;

    public CategoryViewModel process(String categoryKey) {
        return CategoryViewModel.build(
            this.catalogDAO.getProductsByCategory(categoryKey),
            getFilters(allProductsCategory(), categoryKey)
        );
    }

    public CategoryViewModel process() {
        var allCategory = allProductsCategory();
        return CategoryViewModel.build(
            Optional.of(allCategory.setProducts(this.catalogDAO.getAllProducts().toList())),
            getFilters(allCategory, allCategory.getKey())
        );
    }

    private List<CategoryFilter> getFilters(Category allProducts, String active) {
        return Stream.concat(
            this.catalogDAO.getAllCategories().map(this.mapToFilter(active)),
            Stream.of(new CategoryFilter("/products", allProducts.getName(), allProducts.getKey().equals(active)))
        ).toList();
    }

    private Function<Category, CategoryFilter> mapToFilter(String active) {
        return category -> CategoryFilter.from(
                String.format("/products/%s", category.getKey()),
                category.getName(),
                category.getKey().equals(active)
        );
    }

    private Category allProductsCategory() {
        return new Category(
            "all",
            "All machines"
        );
    }
}
