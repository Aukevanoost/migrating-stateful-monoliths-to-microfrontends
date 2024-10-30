package com.aukevanoost.domain.boundaries;

import com.aukevanoost.domain.dao.mock.MockStoreDAO;
import com.aukevanoost.domain.entities.Store;

import java.util.stream.Stream;

public interface IStoreDAO {
    Stream<Store> getStores();

    static IStoreDAO inject() {
        return new MockStoreDAO();
    }
}
