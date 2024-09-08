package com.aukevanoost.interfaces.boundaries.home;

import com.aukevanoost.domain.entities.Recommendation;
import com.aukevanoost.domain.entities.Teaser;

import java.util.List;

public record HomeViewModel(List<Teaser> teasers, List<Recommendation> recommended) {


    public static HomeViewModel build(List<Teaser> teasers, List<Recommendation> recommended) {
        return new HomeViewModel(teasers, recommended);
    }
}
