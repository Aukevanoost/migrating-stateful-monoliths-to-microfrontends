package com.aukevanoost.presentation.home;

import com.aukevanoost.interfaces.boundaries.discovery.DiscoveryControllerFactory;
import com.aukevanoost.interfaces.boundaries.discovery.IDiscoveryController;
import com.aukevanoost.presentation._core.components.RemoteContentPanel;
import com.aukevanoost.presentation._core.layout.BaseTemplate;
import org.apache.wicket.AttributeModifier;
import org.apache.wicket.markup.html.basic.Label;

public class HomePage extends BaseTemplate {
    private transient final IDiscoveryController discoveryController;

    public HomePage(){
        super();
        this.discoveryController = DiscoveryControllerFactory.inject();
    }

    protected void onInitialize() {
        super.onInitialize();
        try {
            var Config = discoveryController.fetchConfig("http://localhost:3000");

            var teasers = Config.getMicroFrontends().get("teasers").getFirst();
            var recommendations = Config.getMicroFrontends().get("recommendations").getFirst();

            add(new RemoteContentPanel(
                "exp_teasers",
                teasers.getExtras().getSsr().getHtml()
            ));
            add(new RemoteContentPanel(
                "exp_recommendations",
                recommendations.getExtras().getSsr().getHtml()
            ));

            var hydrationScript = String.format("""
                import { initFederation } from './scripts/init-federation.js';
                initFederation({
                    "teasers": "%s",
                    "recommendations": "%s"
                }).then(({load, importMap}) => {
                        return Promise.all([
                            load('teasers', '%s'),
                            load('recommendations', '%s')
                        ])
                    })
                """,
                teasers.getExtras().getNativefederation().getRemoteEntry(),
                recommendations.getExtras().getNativefederation().getRemoteEntry(),
                teasers.getExtras().getNativefederation().getExposedModule(),
                recommendations.getExtras().getNativefederation().getExposedModule()
            );

            add(new Label("hydrationScript", hydrationScript)
                .setEscapeModelStrings(false)
                .add(new AttributeModifier("type", "module-shim")));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}