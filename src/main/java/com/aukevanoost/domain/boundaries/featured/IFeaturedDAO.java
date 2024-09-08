package com.aukevanoost.domain.boundaries.featured;

import com.aukevanoost.domain.entities.Recommendation;
import com.aukevanoost.domain.entities.Teaser;

import java.util.stream.Stream;

public interface IFeaturedDAO {
    Stream<Teaser> getTeasers();

    Stream<Recommendation> getRecommendations(String ...sku);

    Stream<Recommendation> getRecommendationsSimilarColor(Integer[] rgb, int length);
}