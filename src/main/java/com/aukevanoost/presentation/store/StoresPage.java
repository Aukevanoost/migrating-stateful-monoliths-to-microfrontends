package com.aukevanoost.presentation.store;

import com.aukevanoost.interfaces.boundaries.store.IStoreController;
import com.aukevanoost.interfaces.boundaries.store.StoreViewModel;
import com.aukevanoost.presentation.store.components.StoreCardPanel;
import com.aukevanoost.presentation._core.ListViewHandler;
import com.aukevanoost.presentation._core.layout.BaseTemplate;
import jakarta.inject.Inject;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.Model;

public class StoresPage extends BaseTemplate {

    private transient IStoreController storesController;

    private final IModel<StoreViewModel> vm;

    public StoresPage(){
        super();
        this.storesController = IStoreController.inject();
        vm = Model.of(storesController.process());
    }

    protected void onInitialize() {
        add(ListViewHandler.asPanel(
            "storeCards",
            vm.map(StoreViewModel::stores),
            StoreCardPanel::new
        ));

        super.onInitialize();
    }
}