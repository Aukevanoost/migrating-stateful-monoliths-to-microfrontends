package com.aukevanoost.presentation.pages.product;

import com.aukevanoost.interfaces.boundaries._dto.VariantOptionDTO;
import org.apache.wicket.AttributeModifier;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.BookmarkablePageLink;
import org.apache.wicket.markup.html.panel.Fragment;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.request.mapper.parameter.PageParameters;

import java.util.function.Function;

public class VariantOptionPanel extends Panel {
    private final VariantOptionDTO option;
    private WebMarkupContainer variantOption;

    public VariantOptionPanel(String id, VariantOptionDTO option) {
        super(id);
        this.option = option;
    }

    protected void onInitialize() {
        super.onInitialize();
        Fragment fragment;

        variantOption = new WebMarkupContainer("variantOption");
        variantOption.add(new AttributeModifier("style", "--variant-color: " + option.color()));

        if (option.active()) {
            fragment = new Fragment("optionContainer", "activeVariant", this);
            fragment.setRenderBodyOnly(true);

            Label x = new Label("variantName", option.name());
            fragment.add(x);

        } else {
            fragment = new Fragment("optionContainer", "inactiveVariant", this);
            fragment.setRenderBodyOnly(true);

            BookmarkablePageLink<Void> link = new BookmarkablePageLink<>(
                "link",
                getPage().getClass(),
                new PageParameters(getPage().getPageParameters())
                    .set("variant", option.sku())
            );
            link.add(new Label("variantName", option.name()));

            fragment.add(link);
        }

        variantOption.add(fragment);
        add(variantOption);

        setRenderBodyOnly(true);
    }

    @Override
    protected void onAfterRender() {
        super.onAfterRender();
    }
}
