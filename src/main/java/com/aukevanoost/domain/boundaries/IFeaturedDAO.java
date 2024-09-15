package com.aukevanoost.domain.boundaries;

import com.aukevanoost.domain.entities.Recommendation;
import com.aukevanoost.domain.entities.Teaser;

import java.util.stream.Stream;

public interface IFeaturedDAO {
    Stream<Teaser> getTeasers();
}