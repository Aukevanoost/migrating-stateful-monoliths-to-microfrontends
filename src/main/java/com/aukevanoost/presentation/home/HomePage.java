package com.aukevanoost.presentation.home;

import com.aukevanoost.interfaces.boundaries.featured.FeaturedControllerFactory;
import com.aukevanoost.presentation._core.layout.BaseTemplate;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.Model;

public class HomePage extends BaseTemplate {
    private final IModel<HomeViewModel> vm;

    public HomePage(){
        super();
        var controller = FeaturedControllerFactory.inject();
        vm = Model.of(HomeViewModel.from(controller));
    }

    protected void onInitialize() {
        super.onInitialize();
    }
}