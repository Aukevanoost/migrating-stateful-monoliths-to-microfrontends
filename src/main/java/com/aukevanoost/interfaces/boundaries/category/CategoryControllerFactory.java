package com.aukevanoost.interfaces.boundaries.category;

import com.aukevanoost.domain.boundaries.catalog.CatalogDAOFactory;
import com.aukevanoost.interfaces.CategoryController;

public class CategoryControllerFactory {
    public static ICategoryController build() {
        var dao = CatalogDAOFactory.getMock();

        return new CategoryController(dao);
    }
}
