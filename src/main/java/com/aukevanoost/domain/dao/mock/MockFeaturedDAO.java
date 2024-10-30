package com.aukevanoost.domain.dao.mock;

import com.aukevanoost.domain.boundaries.IFeaturedDAO;
import com.aukevanoost.domain.dao.mock.db.Teasers;
import com.aukevanoost.domain.entities.Teaser;

import java.util.stream.Stream;

public class MockFeaturedDAO implements IFeaturedDAO {

    public MockFeaturedDAO() {  }

    @Override
    public Stream<Teaser> getTeasers() {
        return Teasers.ALL.stream();
    }
}
