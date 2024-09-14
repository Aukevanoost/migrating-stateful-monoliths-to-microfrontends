package com.aukevanoost.interfaces.boundaries.home;

import com.aukevanoost.interfaces.boundaries.home.dto.RecommendationDTO;
import com.aukevanoost.interfaces.boundaries.home.dto.TeaserDTO;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public record HomeViewModel(List<TeaserDTO> teasers, List<RecommendationDTO> recommended) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    public static HomeViewModel build(List<TeaserDTO> teasers, List<RecommendationDTO> recommended) {
        return new HomeViewModel(teasers, recommended);
    }
}
