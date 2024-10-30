package com.aukevanoost.interfaces.boundaries.category;

import com.aukevanoost.domain.boundaries.ICatalogDAO;
import com.aukevanoost.interfaces.CategoryController;

public interface ICategoryController {
    CategoryViewModel process(String category);
    CategoryViewModel process();

    static ICategoryController inject() {
        return new CategoryController(
            ICatalogDAO.inject()
        );
    }
}
