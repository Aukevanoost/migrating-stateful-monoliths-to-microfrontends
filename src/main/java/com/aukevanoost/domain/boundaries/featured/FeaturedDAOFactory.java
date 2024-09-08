package com.aukevanoost.domain.boundaries.featured;

import com.aukevanoost.domain.dao.mock.MockFeaturedDAO;

public class FeaturedDAOFactory {
    public static IFeaturedDAO getMock() {
        return new MockFeaturedDAO();
    }
}
