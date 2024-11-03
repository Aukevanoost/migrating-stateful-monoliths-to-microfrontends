package com.aukevanoost.presentation.cart;

import com.aukevanoost.presentation.StoreSession;
import com.aukevanoost.presentation._core.layout.BaseTemplate;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.model.LoadableDetachableModel;

import java.util.List;

public class CartPage extends BaseTemplate {

    public CartPage(){
        super();
    }

    protected void onInitialize() {
        super.onInitialize();

        add(new ListView<>("cartItems",
            new LoadableDetachableModel<List<CartItem>>() {
                @Override
                protected List<CartItem> load() {
                    return StoreSession.get().cart().items();
                }
            }) {
            @Override
            protected void populateItem(ListItem<CartItem> item) {
                CartItem cartItem = item.getModelObject();
                item.add(new Label("sku", String.format("%s", cartItem.sku())));
                item.add(new Label("price", String.format("%d Ø", cartItem.price())));
                item.add(new Label("quantity", cartItem.quantity()));
                item.add(new Label("total",
                    String.format("%d Ø", cartItem.price() * cartItem.quantity())));
            }
        });
    }
}