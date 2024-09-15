package com.aukevanoost.presentation.pages.stores;

import com.aukevanoost.interfaces.boundaries.stores.IStoresController;
import com.aukevanoost.interfaces.boundaries.stores.StoresViewModel;
import com.aukevanoost.presentation.template.BaseTemplate;
import jakarta.inject.Inject;
import org.apache.wicket.markup.repeater.RepeatingView;

public class StoresPage extends BaseTemplate {

    @Inject
    private transient IStoresController storesController;

    private final StoresViewModel vm;

    public StoresPage(){
        super();
        vm = storesController.process();
    }

    protected void onInitialize() {
        RepeatingView stores = new RepeatingView("storeCards");

        vm.stores()
            .stream()
            .map(s -> new StoreCardPanel(stores.newChildId(), s))
            .forEach(stores::add);
        add(stores);

        super.onInitialize();
    }
}