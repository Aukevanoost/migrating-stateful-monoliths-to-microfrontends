package com.aukevanoost.domain.dao.mock.db;

import com.aukevanoost.domain.entities.Recommendation;

import java.util.Map;
import java.util.stream.Collectors;

public class Recommendations {
    public static Map<String, Recommendation> ALL = Products.ALL.values()
        .stream()
        .flatMap(
            p -> p.getVariants()
                .stream()
                .map(v -> Map.entry(v.getSku(), Recommendation.fromProduct(p, v.getSku())))
        )
        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
}
