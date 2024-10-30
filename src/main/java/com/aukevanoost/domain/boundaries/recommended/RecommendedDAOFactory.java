package com.aukevanoost.domain.boundaries.recommended;

import com.aukevanoost.domain.dao.mock.MockRecommendedDAO;

public class RecommendedDAOFactory {
    public static IRecommendedDAO inject() {
        return new MockRecommendedDAO();
    }
}
