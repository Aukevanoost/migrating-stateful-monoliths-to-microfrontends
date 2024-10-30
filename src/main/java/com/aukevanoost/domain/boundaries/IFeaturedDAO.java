package com.aukevanoost.domain.boundaries;

import com.aukevanoost.domain.dao.mock.MockFeaturedDAO;
import com.aukevanoost.domain.entities.Teaser;

import java.util.stream.Stream;

public interface IFeaturedDAO {
    Stream<Teaser> getTeasers();

    static IFeaturedDAO inject() {
        return new MockFeaturedDAO();
    }
}