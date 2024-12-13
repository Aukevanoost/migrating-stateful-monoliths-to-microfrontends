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
        System.out.println("RUNNING NEW HOMEPAGE");
        try {
            long start = System.nanoTime();

            var Config = discoveryController.fetchConfig("http://localhost:3000/from-manifest");

            long finish = System.nanoTime();
            System.out.println("Time taken in ms: " + (finish - start) / 1000000);

            String teasersKey = "explore/teasers";
            var teasers = Config.getMicroFrontends().get(teasersKey).getFirst();
            add(new RemoteContentPanel(
                "exp_teasers",
                teasers.getExtras().getSsr().getHtml()  // This is the URL
            ));

            String recommendationsKey = "explore/recommendations";
            var recommendations = Config.getMicroFrontends().get(recommendationsKey).getFirst();
            add(new RemoteContentPanel(
                "exp_recommendations",
                recommendations.getExtras().getSsr().getHtml()  // This is the URL
            ));


            var hydrationScript = String.format("""
                import { initMicroFrontends } from './scripts/loader.js';
                
                initMicroFrontends({
                    '%s': '%s',
                    '%s': '%s'
                })
                """,
                teasersKey,
                teasers.getExtras().getNativefederation().getRemoteEntry(),
                recommendationsKey,
                recommendations.getExtras().getNativefederation().getRemoteEntry()
            );

            add(new Label("hydrationScript", hydrationScript)
                .setEscapeModelStrings(false)
                .add(new AttributeModifier("type", "module-shim")));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}