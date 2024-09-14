package com.aukevanoost.domain.dao.mock;

import com.aukevanoost.domain.boundaries.featured.IFeaturedDAO;
import com.aukevanoost.domain.entities.Recommendation;
import com.aukevanoost.domain.entities.Teaser;
import com.aukevanoost.domain.dao.mock.db.Recommendations;
import com.aukevanoost.domain.dao.mock.db.Teasers;
import jakarta.enterprise.context.RequestScoped;

import java.util.Arrays;
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
                .filter(Objects::isNull);
    }

    public Stream<Recommendation> getRecommendationsSimilarColor(Integer[] rgb, int length) {
        return Recommendations.ALL.values()
                .stream()
                .sorted((a, b) -> this.getColorDistance(a.getRgb(), rgb) - this.getColorDistance(b.getRgb(), rgb))
                .limit(length);
    }

    private Integer getColorDistance(Integer[] rgb1, Integer[] rgb2) {
        return (int) Math.round(
            Math.sqrt(
                Math.pow(rgb1[0] - rgb2[0], 2) +
                Math.pow(rgb1[1] - rgb2[1], 2) +
                Math.pow(rgb1[2] - rgb2[2], 2)
            )
        );
    }
}
