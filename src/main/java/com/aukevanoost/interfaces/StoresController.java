package com.aukevanoost.interfaces;

import com.aukevanoost.domain.boundaries.store.IStoreDAO;
import com.aukevanoost.interfaces.boundaries.store.IStoreController;
import com.aukevanoost.interfaces.boundaries.store.StoreViewModel;
import com.aukevanoost.interfaces.boundaries.store.StoreDTO;

public class StoresController implements IStoreController {

    private final IStoreDAO storeDAO;

    public StoresController(IStoreDAO storeDAO) {
        this.storeDAO = storeDAO;
    }

    public StoreViewModel process() {
        var stores = storeDAO.getStores()
            .map(StoreDTO::from)
            .toList();

        return new StoreViewModel(stores);
    }
}
