package com.aukevanoost.domain.boundaries;

import com.aukevanoost.domain.entities.Recommendation;

import java.util.stream.Stream;

public interface IRecommendedDAO {
    Stream<Recommendation> getRecommendations(int maxlength, String ...sku);
}
