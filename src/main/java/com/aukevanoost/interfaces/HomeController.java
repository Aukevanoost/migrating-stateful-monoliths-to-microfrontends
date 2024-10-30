package com.aukevanoost.interfaces;

import com.aukevanoost.domain.boundaries.IFeaturedDAO;
import com.aukevanoost.domain.boundaries.IRecommendedDAO;
import com.aukevanoost.interfaces.boundaries.home.IHomeController;
import com.aukevanoost.interfaces.boundaries.home.HomeViewModel;
import com.aukevanoost.interfaces.boundaries.recommendation.RecommendationDTO;
import com.aukevanoost.interfaces.boundaries.home.TeaserDTO;

public class HomeController implements IHomeController {

    private IFeaturedDAO featuredDAO;

    private IRecommendedDAO recommendedDAO;

    public HomeController(IFeaturedDAO featuredDAO, IRecommendedDAO recommendedDAO) {
        this.featuredDAO = featuredDAO;
        this.recommendedDAO = recommendedDAO;
    }

    public HomeViewModel process() {
        var teasers = featuredDAO
            .getTeasers()
            .map(TeaserDTO::from)
            .toList();

        var recommendations = recommendedDAO
            .getRecommendations(4, "CL-01-GY", "AU-07-MT")
            .map(RecommendationDTO::from)
            .toList();

        return new HomeViewModel(teasers, recommendations);
    }


}
