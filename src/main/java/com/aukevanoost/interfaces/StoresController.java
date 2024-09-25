package com.aukevanoost.interfaces;

import com.aukevanoost.domain.boundaries.IStoreDAO;
import com.aukevanoost.interfaces.boundaries.store.IStoreController;
import com.aukevanoost.interfaces.boundaries.store.StoreViewModel;
import com.aukevanoost.interfaces.boundaries.store.StoreDTO;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

@RequestScoped
public class StoresController implements IStoreController {

    @Inject
    private IStoreDAO storeDAO;

    public StoreViewModel process() {
        var stores = storeDAO.getStores()
            .map(StoreDTO::from)
            .toList();

        return new StoreViewModel(stores);
    }
}
