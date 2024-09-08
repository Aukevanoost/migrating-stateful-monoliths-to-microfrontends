package com.aukevanoost.domain.dao.mock.db;

import com.aukevanoost.domain.entities.Teaser;

import java.util.List;

public class Teasers {
    public static List<Teaser> ALL = List.of(
            new Teaser(
                    "Classic Tractors",
                    "/img/scene/[size]/classics.webp",
                    "/products/classic"
            ),
            new Teaser(
                    "Autonomous Tractors",
                    "/img/scene/[size]/autonomous.webp",
                    "/products/autonomous"
            )
    );
}
