package com.aukevanoost.domain.dao.mock;

import com.aukevanoost.domain.boundaries.IStoreDAO;
import com.aukevanoost.domain.dao.mock.db.Stores;
import com.aukevanoost.domain.entities.Store;
import jakarta.enterprise.context.RequestScoped;

import java.util.stream.Stream;

@RequestScoped
public class MockStoreDAO implements IStoreDAO {
    @Override
    public Stream<Store> getStores() {
        return Stores.ALL.stream();
    }
}