package com.aukevanoost.presentation.pages.stores;

import com.aukevanoost.interfaces.boundaries.stores.IStoresController;
import com.aukevanoost.interfaces.boundaries.stores.StoresViewModel;
import com.aukevanoost.presentation.components.cards.StoreCardPanel;
import com.aukevanoost.presentation.handlers.ListViewHandler;
import com.aukevanoost.presentation.template.BaseTemplate;
import jakarta.inject.Inject;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.Model;

public class StoresPage extends BaseTemplate {

    @Inject
    private transient IStoresController storesController;

    private final IModel<StoresViewModel> vm;

    public StoresPage(){
        super();
        vm = Model.of(storesController.process());
    }

    protected void onInitialize() {
        add(ListViewHandler.asPanel(
            "storeCards",
            vm.map(StoresViewModel::stores),
            StoreCardPanel::new
        ));

        super.onInitialize();
    }
}