package com.aukevanoost.domain.dao.mock;

import com.aukevanoost.domain.boundaries.IFeaturedDAO;
import com.aukevanoost.domain.dao.mock.db.Categories;
import com.aukevanoost.domain.dao.mock.db.Recommendations;
import com.aukevanoost.domain.dao.mock.db.Teasers;
import com.aukevanoost.domain.entities.Category;
import com.aukevanoost.domain.entities.Recommendation;
import com.aukevanoost.domain.entities.Teaser;
import jakarta.enterprise.context.RequestScoped;

import java.util.Arrays;
import java.util.Comparator;
import java.util.Objects;
import java.util.stream.Stream;

@RequestScoped
public class MockFeaturedDAO implements IFeaturedDAO {

    public MockFeaturedDAO() {  }

    @Override
    public Stream<Teaser> getTeasers() {
        return Teasers.ALL.stream();
    }
}
