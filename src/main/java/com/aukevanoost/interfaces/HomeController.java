package com.aukevanoost.interfaces;

import com.aukevanoost.domain.boundaries.IFeaturedDAO;
import com.aukevanoost.domain.boundaries.IRecommendedDAO;
import com.aukevanoost.interfaces.boundaries.home.IHomeController;
import com.aukevanoost.interfaces.boundaries.home.HomeViewModel;
import com.aukevanoost.interfaces.boundaries._dto.RecommendationDTO;
import com.aukevanoost.interfaces.boundaries._dto.TeaserDTO;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

@RequestScoped
public class HomeController implements IHomeController {

    @Inject
    private IFeaturedDAO featuredDAO;

    @Inject
    private IRecommendedDAO recommendedDAO;

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
