package com.aukevanoost.interfaces;

import com.aukevanoost.domain.boundaries.recommended.IRecommendedDAO;
import com.aukevanoost.domain.boundaries.teaser.ITeaserDAO;
import com.aukevanoost.interfaces.boundaries.featured.TeaserDTO;
import com.aukevanoost.interfaces.boundaries.featured.IFeaturedController;
import com.aukevanoost.interfaces.boundaries.recommendation.RecommendationDTO;

import java.util.List;

public class FeaturedController implements IFeaturedController {
    private ITeaserDAO teaserDAO;
    private IRecommendedDAO recommendedDAO;

    public FeaturedController(ITeaserDAO teaserDAO, IRecommendedDAO recommendedDAO) {
        this.teaserDAO = teaserDAO;
        this.recommendedDAO = recommendedDAO;
    }

    public List<TeaserDTO> getTeasers() {
        return teaserDAO
            .getAll()
            .map(TeaserDTO::from)
            .toList();
    }

    public List<RecommendationDTO> getRecommendations() {
        return recommendedDAO
            .getRecommendations(4, "CL-01-GY", "AU-07-MT")
            .map(RecommendationDTO::from)
            .toList();
    }

}
