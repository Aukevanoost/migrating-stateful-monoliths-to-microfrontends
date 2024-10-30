package com.aukevanoost.interfaces.boundaries.home;

import com.aukevanoost.domain.boundaries.IFeaturedDAO;
import com.aukevanoost.domain.boundaries.IRecommendedDAO;
import com.aukevanoost.interfaces.HomeController;

public interface IHomeController {
    HomeViewModel process();

    static IHomeController inject() {
        return new HomeController(
            IFeaturedDAO.inject(),
            IRecommendedDAO.inject()
        );
    }
}
