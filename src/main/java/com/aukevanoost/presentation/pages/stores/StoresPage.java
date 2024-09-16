package com.aukevanoost.presentation.pages.stores;

import com.aukevanoost.interfaces.boundaries.stores.IStoresController;
import com.aukevanoost.interfaces.boundaries.stores.StoresViewModel;
import com.aukevanoost.presentation.components.cards.StoreCardPanel;
import com.aukevanoost.presentation.handlers.RepeatingViewHandler;
import com.aukevanoost.presentation.template.BaseTemplate;
import jakarta.inject.Inject;

public class StoresPage extends BaseTemplate {

    @Inject
    private transient IStoresController storesController;

    private final StoresViewModel vm;

    public StoresPage(){
        super();
        vm = storesController.process();
    }

    protected void onInitialize() {
        add(RepeatingViewHandler.asCards(
            "storeCards",
            vm.stores(),
            StoreCardPanel::new
        ));

        super.onInitialize();
    }
}