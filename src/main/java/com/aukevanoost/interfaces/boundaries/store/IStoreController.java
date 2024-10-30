package com.aukevanoost.interfaces.boundaries.store;

import com.aukevanoost.domain.boundaries.IStoreDAO;
import com.aukevanoost.interfaces.StoresController;

public interface IStoreController {
    StoreViewModel process();

    static IStoreController inject() {
        return new StoresController(
            IStoreDAO.inject()
        );
    }
}
