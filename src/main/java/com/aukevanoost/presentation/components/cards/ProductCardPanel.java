package com.aukevanoost.presentation.components.cards;

import com.aukevanoost.interfaces.boundaries._dto.ProductPreviewDTO;
import com.aukevanoost.presentation.components.ImagePanel;
import com.aukevanoost.presentation.pages.product.ProductPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.panel.GenericPanel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.request.mapper.parameter.PageParameters;

import java.text.DecimalFormat;

public class ProductCardPanel extends GenericPanel<ProductPreviewDTO> {

    public ProductCardPanel(String id, IModel<ProductPreviewDTO> productModel) {
        super(id, productModel);
    }

    protected void onInitialize() {
        super.onInitialize();


        Link<ProductPreviewDTO> link = new Link<>("url", getModel()) {
            @Override
            public void onClick() {
                var product = this.getModelObject();
                setResponsePage(ProductPage.class, new PageParameters().add("product", product.sku()));
            }
        };
        link.add(new ImagePanel(ProductPreviewDTO.IMAGE, PropertyModel.of(getModel(), ProductPreviewDTO.IMAGE), 200, 400, 800));

        link.add(new Label(ProductPreviewDTO.NAME, PropertyModel.of(getModel(), ProductPreviewDTO.NAME)));
        link.add(new Label(ProductPreviewDTO.START_PRICE, PropertyModel.of(getModel(), ProductPreviewDTO.START_PRICE)));
        add(link);
    }

    private String convertPrice(Integer price) {
        return (new DecimalFormat("##,###.00 Ø")).format(price);
    }

}
