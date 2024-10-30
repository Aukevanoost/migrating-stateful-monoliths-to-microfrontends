package com.aukevanoost.interfaces.boundaries.store;

import com.aukevanoost.domain.boundaries.store.StoreDAOFactory;
import com.aukevanoost.interfaces.StoresController;

public interface IStoreController {
    StoreViewModel process();

    static IStoreController inject() {
        return new StoresController(
            StoreDAOFactory.inject()
        );
    }
}
