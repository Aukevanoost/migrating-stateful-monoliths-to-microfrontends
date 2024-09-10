package com.aukevanoost.domain.boundaries.featured;

import com.aukevanoost.domain.dao.mock.MockCatalogDAO;

public class CatalogDAOFactory {
    public static ICatalogDAO getMock() {
        return new MockCatalogDAO();
    }
}
