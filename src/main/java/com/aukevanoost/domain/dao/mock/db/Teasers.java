package com.aukevanoost.domain.dao.mock.db;

import com.aukevanoost.domain.entities.Teaser;

import java.util.List;

public class Teasers {
    public static List<Teaser> ALL = List.of(
        new Teaser(
            "Classic Tractors",
            "/img/scene/[size]/classics.webp",
            Categories.ALL.get("classic")
        ),
        new Teaser(
            "Autonomous Tractors",
            "/img/scene/[size]/autonomous.webp",
            Categories.ALL.get("autonomous")
        )
    );
}
