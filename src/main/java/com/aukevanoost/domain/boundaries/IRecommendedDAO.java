package com.aukevanoost.domain.boundaries;

import com.aukevanoost.domain.entities.Recommendation;

import java.util.stream.Stream;

public interface IRecommendedDAO {
    Stream<Recommendation> getRecommendations(String ...sku);
    Stream<Recommendation> getRecommendationsSimilarColor(Integer[] rgb, int length);
}
