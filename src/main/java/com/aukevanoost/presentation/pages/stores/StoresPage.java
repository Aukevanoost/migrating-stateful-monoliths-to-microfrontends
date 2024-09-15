package com.aukevanoost.presentation.pages.stores;

import com.aukevanoost.interfaces.boundaries.stores.IStoresController;
import com.aukevanoost.interfaces.boundaries.stores.StoresViewModel;
import com.aukevanoost.presentation.template.BaseTemplate;
import jakarta.inject.Inject;
import org.apache.wicket.markup.repeater.RepeatingView;

public class StoresPage extends BaseTemplate {

    @Inject
    private transient IStoresController storesController;

    private final StoresViewModel storesViewModel;

    public StoresPage(){
        super();
        storesViewModel = storesController.process();
    }

    protected void onInitialize() {
        RepeatingView stores = new RepeatingView("storeCards");

        storesViewModel.stores()
            .stream()
            .map(s -> new StoreCardPanel(stores.newChildId(), s))
            .forEach(stores::add);
        add(stores);

        super.onInitialize();
    }
}