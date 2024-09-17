package com.aukevanoost.presentation.pages.product;

import com.aukevanoost.interfaces.boundaries._dto.RecommendationDTO;
import com.aukevanoost.interfaces.boundaries._dto.VariantOptionDTO;
import org.apache.wicket.AttributeModifier;
import org.apache.wicket.behavior.Behavior;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.BookmarkablePageLink;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.panel.Fragment;
import org.apache.wicket.markup.html.panel.GenericPanel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.request.mapper.parameter.PageParameters;

public class VariantOptionPanel extends GenericPanel<VariantOptionDTO>{
    private final WebMarkupContainer variantOption;

    private final Fragment activeFragment;
    private final Fragment inactiveFragment;

    public VariantOptionPanel(String id, IModel<VariantOptionDTO> option) {
        super(id, option);
        variantOption = new WebMarkupContainer("variantOption");

        activeFragment = createActiveFragment();
        inactiveFragment = createInactiveFragment();
    }

    @Override
    protected void onInitialize() {
        super.onInitialize();

        variantOption.add(AttributeModifier.append("style",
            PropertyModel.of(getModel(), VariantOptionDTO.COLOR).map(c -> "--variant-color: " + c)));

        variantOption.add(getModelObject().active() ? activeFragment : inactiveFragment);
        add(variantOption);
        setOutputMarkupId(true);
    }

    private Fragment createActiveFragment() {
        Fragment fragment = new Fragment("optionContainer", "activeFragment", this);
        fragment.add(new Label(VariantOptionDTO.NAME, PropertyModel.of(getModel(), VariantOptionDTO.NAME)));
        fragment.setOutputMarkupId(true);
        return fragment;
    }

    private Fragment createInactiveFragment() {
        Fragment fragment = new Fragment("optionContainer", "inactiveFragment", this);
        fragment.add(createLink());
        fragment.setOutputMarkupId(true);
        return fragment;
    }

    private Link<String> createLink() {
        Link<String> link = new Link<>("url", PropertyModel.of(getModel(), VariantOptionDTO.SKU)) {
            @Override
            public void onClick() {
                setResponsePage(
                    ProductPage.class,
                    new PageParameters(getPage().getPageParameters())
                        .set("variant", getModelObject())
                );
            }
        };
        link.add(new Label(
            VariantOptionDTO.NAME,
            PropertyModel.of(getModel(), VariantOptionDTO.NAME)
        ));
        return link;
    }


    @Override
    protected void onModelChanged() {
//        variantOption.replace(getModelObject().active() ? activeFragment : inactiveFragment);
        super.onModelChanged();
    }
}