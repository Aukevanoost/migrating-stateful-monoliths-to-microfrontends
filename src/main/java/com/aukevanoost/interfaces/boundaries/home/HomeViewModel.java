package com.aukevanoost.interfaces.boundaries.home;

import com.aukevanoost.interfaces.boundaries._dto.RecommendationDTO;
import com.aukevanoost.interfaces.boundaries._dto.TeaserDTO;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public record HomeViewModel(
    List<TeaserDTO> teasers,
    List<RecommendationDTO> recommended
) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
}
