package com.aukevanoost.presentation.product.components;

import com.aukevanoost.interfaces.boundaries.inventory.StockInfoDTO;
import com.aukevanoost.presentation.StoreSession;
import com.aukevanoost.presentation.cart.CartItem;
import com.aukevanoost.presentation.cart.CartPage;
import com.aukevanoost.presentation.cart.CartState;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.HiddenField;
import org.apache.wicket.markup.html.panel.Fragment;
import org.apache.wicket.markup.html.panel.GenericPanel;
import org.apache.wicket.model.CompoundPropertyModel;
import org.apache.wicket.model.IModel;

import java.io.Serial;

public class AddToCartPanel extends GenericPanel<StockInfoDTO> {
    private final Form<Void> form;
    private final Fragment inStockFragment;
    private final Fragment outOfStockFragment;

    public AddToCartPanel(String id, IModel<StockInfoDTO> model) {
        super(id, model);
        inStockFragment = createInStockFragment();
        outOfStockFragment = createOutOfStockFragment();
        form = new AddToCartForm("form",
            getModelObject().sku(),
            getModelObject().price());
    }

     @Override
    protected void onInitialize() {
        super.onInitialize();
        form.add(new Label("price", getModel().map(x -> String.format("%d Ø", x.price()))));
        form.add(getModelObject().inventory() > 0 ? inStockFragment : outOfStockFragment);

        var btn = new Button("action");
        btn.setEnabled(getModelObject().inventory() > 0);
        form.add(btn);

        add(form);
    }

    private Fragment createInStockFragment() {
        Fragment fragment = new Fragment("inventoryState", "inStockFragment", this);
        fragment.add(new Label("inventory", getModel().map(StockInfoDTO::inventory)));
        fragment.setOutputMarkupId(true).setRenderBodyOnly(true);
        return fragment;
    }

    private Fragment createOutOfStockFragment() {
        Fragment fragment = new Fragment("inventoryState", "outOfStockFragment", this);
        fragment.setOutputMarkupId(true).setRenderBodyOnly(true);
        return fragment;
    }

    @Override
    protected void onModelChanged() {
        form.add(getModelObject().inventory() > 0 ? inStockFragment : outOfStockFragment);
        super.onModelChanged();
    }

    public static class AddToCartForm extends Form<Void> {
        @Serial
        private static final long serialVersionUID = 1L;

        private String sku;
        private int price;

        public AddToCartForm(String id, String sku, int price) {
            super(id);
            setDefaultModel(new CompoundPropertyModel<>(this));

            this.sku = sku;
            this.price = price;
        }

        @Override
        protected void onInitialize() {
            super.onInitialize();
            add(new HiddenField<>("sku"));
        }

        @Override
        protected void onSubmit() {
            CartItem item = new CartItem(sku, price);
            StoreSession.get().updateCart(cart -> cart.add(item));

            success("Item added to cart");

            setResponsePage(CartPage.class);
        }
    }
}
