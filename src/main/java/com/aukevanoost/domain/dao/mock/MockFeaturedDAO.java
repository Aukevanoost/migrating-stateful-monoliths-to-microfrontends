package com.aukevanoost.domain.dao.mock;

import com.aukevanoost.domain.boundaries.IFeaturedDAO;
import com.aukevanoost.domain.dao.mock.db.Categories;
import com.aukevanoost.domain.dao.mock.db.Recommendations;
import com.aukevanoost.domain.dao.mock.db.Teasers;
import com.aukevanoost.domain.entities.Category;
import com.aukevanoost.domain.entities.Recommendation;
import com.aukevanoost.domain.entities.Teaser;
import jakarta.enterprise.context.RequestScoped;

import java.util.Arrays;
import java.util.Comparator;
import java.util.Objects;
import java.util.stream.Stream;

@RequestScoped
public class MockFeaturedDAO implements IFeaturedDAO {

    public MockFeaturedDAO() {  }

    @Override
    public Stream<Teaser> getTeasers() {
        return Teasers.ALL.stream();
    }

    public Stream<Recommendation> getRecommendations(String... sku) {
        return Arrays.stream(sku)
            .map(Recommendations.ALL::get)
            .filter(Objects::nonNull);
    }

    public Stream<Recommendation> getRecommendationsSimilarColor(Integer[] rgb, int length) {
        return Recommendations.stream()
            .sorted((Comparator.comparingDouble(x -> getColorDistance(x.rgb(), rgb))))
            .limit(length);
    }

    private double getColorDistance(Integer[] rgb1, Integer[] rgb2) {
        return  Math.sqrt(
            Math.pow(rgb1[0] - rgb2[0], 2) +
            Math.pow(rgb1[1] - rgb2[1], 2) +
            Math.pow(rgb1[2] - rgb2[2], 2)
        );
    }
}
