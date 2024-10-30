package com.aukevanoost.interfaces.boundaries.featured;

import com.aukevanoost.interfaces.boundaries.recommendation.RecommendationDTO;

import java.util.List;

public interface IFeaturedController{
    List<TeaserDTO> getTeasers();
    List<RecommendationDTO> getRecommendations();
}
