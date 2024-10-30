package com.aukevanoost.interfaces.boundaries.featured;

import com.aukevanoost.domain.boundaries.recommended.RecommendedDAOFactory;
import com.aukevanoost.domain.boundaries.teaser.TeaserDAOFactory;
import com.aukevanoost.interfaces.FeaturedController;

public final class FeaturedControllerFactory {
    public static IFeaturedController inject() {
        return new FeaturedController(
            TeaserDAOFactory.inject(),
            RecommendedDAOFactory.inject()
        );
    }
}
