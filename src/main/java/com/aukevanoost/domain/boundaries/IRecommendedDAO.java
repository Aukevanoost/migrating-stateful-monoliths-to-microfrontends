package com.aukevanoost.domain.boundaries;

import com.aukevanoost.domain.dao.mock.MockRecommendedDAO;
import com.aukevanoost.domain.entities.Recommendation;

import java.util.stream.Stream;

public interface IRecommendedDAO {
    Stream<Recommendation> getRecommendations(int maxlength, String ...sku);

    static IRecommendedDAO inject() {
        return new MockRecommendedDAO();
    }
}
