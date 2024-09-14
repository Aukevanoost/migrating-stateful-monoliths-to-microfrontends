package com.aukevanoost.interfaces;

import com.aukevanoost.domain.boundaries.IStoreDAO;
import com.aukevanoost.interfaces.boundaries.stores.IStoresController;
import com.aukevanoost.interfaces.boundaries.stores.StoresViewModel;
import com.aukevanoost.interfaces.boundaries.stores.dto.StoreDTO;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

@RequestScoped
public class StoresController implements IStoresController {

    @Inject
    private IStoreDAO storeDAO;

    public StoresViewModel process() {
        var stores = storeDAO.getStores()
            .map(StoreDTO::from)
            .toList();

        return StoresViewModel.build(stores);
    }
}
