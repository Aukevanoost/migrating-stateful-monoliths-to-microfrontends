package com.aukevanoost.domain.dao.mock.db;

import com.aukevanoost.domain.entities.Category;
import java.util.Map;
import java.util.stream.IntStream;

public class Categories {
    public static Map<String, Category> ALL = Map.ofEntries(
        Map.entry("classic", new Category(
            "classic",
            "Classics",
            IntStream.rangeClosed(1, 15)
                .mapToObj(Products.getByID("CL"))
                .toList()
        )),
        Map.entry("autonomous", new Category(
            "autonomous",
            "Autonomous",
            IntStream.rangeClosed(1, 8)
                .mapToObj(Products.getByID("AU"))
                .toList()
        ))
    );
}