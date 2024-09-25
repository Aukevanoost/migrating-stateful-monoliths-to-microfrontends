package com.aukevanoost.presentation.product.components;

import com.aukevanoost.interfaces.boundaries.product.CartInfoDTO;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.HiddenField;
import org.apache.wicket.markup.html.panel.Fragment;
import org.apache.wicket.markup.html.panel.GenericPanel;
import org.apache.wicket.model.CompoundPropertyModel;
import org.apache.wicket.model.IModel;

import java.io.Serial;

public class AddToCartPanel extends GenericPanel<CartInfoDTO> {
    private final Form<Void> form;
    private final Fragment inStockFragment;
    private final Fragment outOfStockFragment;

    public AddToCartPanel(String id, IModel<CartInfoDTO> model) {
        super(id, model);
        inStockFragment = createInStockFragment();
        outOfStockFragment = createOutOfStockFragment();
        form = new AddToCartForm("form", getModelObject().sku());
    }

     @Override
    protected void onInitialize() {
        super.onInitialize();
        form.add(new Label("price", getModel().map(x -> String.format("%d Ø", x.price()))));
        form.add(getModelObject().inventory() > 0 ? inStockFragment : outOfStockFragment);
        add(form);
    }

    private Fragment createInStockFragment() {
        Fragment fragment = new Fragment("inventoryState", "inStockFragment", this);
        fragment.add(new Label("inventory", getModel().map(CartInfoDTO::inventory)));
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

        public AddToCartForm(String id, String sku) {
            super(id);
            setDefaultModel(new CompoundPropertyModel<>(this));

            this.sku = sku;
        }

        @Override
        protected void onInitialize() {
            super.onInitialize();
            add(new HiddenField<>("sku"));
        }

        @Override
        public final void onSubmit() {
            System.out.println("Add to cart: " + sku);
        }
    }
}
