package com.aukevanoost.interfaces.boundaries.home;

import com.aukevanoost.domain.boundaries.featured.FeaturedDAOFactory;
import com.aukevanoost.interfaces.HomeController;

public class HomeControllerFactory {
    public static HomeController build() {
        var dao = FeaturedDAOFactory.getMock();

        return new HomeController(dao);
    }
}
