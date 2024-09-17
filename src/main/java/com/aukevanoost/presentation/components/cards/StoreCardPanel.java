package com.aukevanoost.presentation.components.cards;

import com.aukevanoost.interfaces.boundaries._dto.StoreDTO;
import com.aukevanoost.presentation.components.ImagePanel;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.panel.GenericPanel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.PropertyModel;

public class StoreCardPanel extends GenericPanel<StoreDTO> {
    public StoreCardPanel(String id, IModel<StoreDTO> storeModel) {
        super(id, storeModel);
    }

    protected void onInitialize() {
        super.onInitialize();

        add(new ImagePanel(StoreDTO.IMAGE, PropertyModel.of(getModel(), StoreDTO.IMAGE), 200, 400));
        add(new Label(StoreDTO.NAME, PropertyModel.of(getModel(), StoreDTO.NAME)));
        add(new Label(StoreDTO.STREET, PropertyModel.of(getModel(), StoreDTO.STREET)));
        add(new Label(StoreDTO.CITY, PropertyModel.of(getModel(), StoreDTO.CITY)));
    }
}


