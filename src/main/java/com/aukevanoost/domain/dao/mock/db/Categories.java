package com.aukevanoost.domain.dao.mock.db;

import com.aukevanoost.domain.entities.Category;
import com.aukevanoost.domain.entities.Product;
import com.aukevanoost.domain.entities.Teaser;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.IntFunction;
import java.util.function.Supplier;
import java.util.function.UnaryOperator;
import java.util.stream.IntStream;

public class Categories {
    public static List<Category> ALL = List.of(
        new Category(
            "classic",
            "Classics",
            IntStream.rangeClosed(1, 15)
                .mapToObj(Products.getByID("CL"))
                .toList()
        ),
        new Category(
            "autonomous",
            "Autonomous",
            IntStream.rangeClosed(1, 8)
                .mapToObj(Products.getByID("AU"))
                .toList()
        )
    );
}