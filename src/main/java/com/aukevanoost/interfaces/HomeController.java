package com.aukevanoost.interfaces;

import com.aukevanoost.domain.boundaries.featured.IFeaturedDAO;
import com.aukevanoost.domain.entities.Recommendation;
import com.aukevanoost.interfaces.boundaries.home.IHomeController;
import com.aukevanoost.interfaces.boundaries.home.HomeViewModel;

import java.util.List;

public class HomeController implements IHomeController {
    private IFeaturedDAO featuredDAO;

    public HomeController(IFeaturedDAO featuredDAO) {
        this.featuredDAO = featuredDAO;
    }

    public HomeViewModel process() {
        var avgColor = getAverageColor(
            featuredDAO.getRecommendations("CL-01-GY", "AU-07-MT")
                .map(Recommendation::getRgb)
                .toList()
        );
        return HomeViewModel.build(
            featuredDAO.getTeasers().toList(),
            featuredDAO.getRecommendationsSimilarColor(avgColor, 4).toList()
        );
    }

    private Integer[] getAverageColor(List<Integer[]> colors) {
        int size = colors.size();
        Integer[] totalRGB = colors.stream().reduce(
            new Integer[] {0,0,0},
            (a, b) -> new Integer[] {a[0] + b[0], a[1] + b[1], a[2] + b[2]}
        );

        return new Integer[] {
            Math.round((float) totalRGB[0] / size),
            Math.round((float) totalRGB[1] / size),
            Math.round((float) totalRGB[2] / size)
        };
    }
}
