package com.aukevanoost.presentation.home;

import com.aukevanoost.interfaces.boundaries.discovery.DiscoveryControllerFactory;
import com.aukevanoost.interfaces.boundaries.discovery.IDiscoveryController;
import com.aukevanoost.interfaces.discovery.models.MicroFrontend;
import com.aukevanoost.interfaces.discovery.models.MicroFrontendResponse;
import com.aukevanoost.presentation._core.components.RemoteContentPanel;
import com.aukevanoost.presentation._core.layout.BaseTemplate;
import org.apache.wicket.AttributeModifier;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.panel.Panel;

import java.util.concurrent.CompletableFuture;

public class HomePage extends BaseTemplate {
    private static final String TEASERS_KEY = "explore/teasers";
    private static final String RECOMMENDATIONS_KEY = "explore/recommendations";
    private static final String MANIFEST_URL = "http://discovery:3000/from-manifest";

    private transient final IDiscoveryController discoveryController;

    public HomePage() {
        super();
        this.discoveryController = DiscoveryControllerFactory.inject();
    }

    @Override
    protected void onInitialize() {
        super.onInitialize();
        try {
            var config = discoveryController.fetchConfig(MANIFEST_URL);

            System.out.println("Config successfully loaded");
            var mfeContentFutures = discoveryController.fetchMfeContents(
                config,
                TEASERS_KEY, RECOMMENDATIONS_KEY
            );

            CompletableFuture.allOf(
                mfeContentFutures.values().toArray(CompletableFuture[]::new)
            ).join();

            addMfePanel(
                "exp_teasers",
                mfeContentFutures.get(TEASERS_KEY).get()
            );

            addMfePanel(
                "exp_recommendations",
                mfeContentFutures.get(RECOMMENDATIONS_KEY).get()
            );

            addHydrationScript(
                config.getMicroFrontends().get(TEASERS_KEY).getFirst(),
                config.getMicroFrontends().get(RECOMMENDATIONS_KEY).getFirst()
            );

        } catch (Exception e) {
            error("Failed to initialize HomePage: " + e.getMessage());
        }
    }

    private void addMfePanel(String id, MicroFrontendResponse content) {
        if (content.error() != null) {
            System.out.println("Error loading MFE content: " + content.error());
            return;
        }

        add(new RemoteContentPanel(id, content));
    }

    private void addHydrationScript(MicroFrontend teasers, MicroFrontend recommendations) {

        var hydrationScript = String.format("""
            import { initMicroFrontends } from './scripts/loader.js';
            
            initMicroFrontends({
                '%s': '%s',
                '%s': '%s'
            })
            """,
            TEASERS_KEY,
            teasers.getExtras().getNativefederation().getRemoteEntry(),
            RECOMMENDATIONS_KEY,
            recommendations.getExtras().getNativefederation().getRemoteEntry()
        );

        add(new Label("hydrationScript", hydrationScript)
            .setEscapeModelStrings(false)
            .add(new AttributeModifier("type", "module-shim")));
    }
}