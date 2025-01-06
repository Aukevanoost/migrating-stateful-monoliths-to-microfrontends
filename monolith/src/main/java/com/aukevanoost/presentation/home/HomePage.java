package com.aukevanoost.presentation.home;

import com.aukevanoost.interfaces.boundaries.discovery.IDiscoveryController;
import com.aukevanoost.interfaces.discovery.models.Config;
import com.aukevanoost.interfaces.discovery.models.MicroFrontend;
import com.aukevanoost.interfaces.discovery.models.MicroFrontendResponse;
import com.aukevanoost.presentation.WicketApplication;
import com.aukevanoost.presentation._core.components.RemoteContentPanel;
import com.aukevanoost.presentation._core.layout.BaseTemplate;
import org.apache.wicket.AttributeModifier;
import org.apache.wicket.markup.html.basic.Label;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

public class HomePage extends BaseTemplate {
    private static final String TEASERS_KEY = "explore/teasers";
    private static final String RECOMMENDATIONS_KEY = "explore/recommendations";
    private static final String MANIFEST_URL = "http://docker.for.mac.localhost:3000/from-manifest";

    private transient final IDiscoveryController discoveryController;

    public HomePage() {
        super();
        this.discoveryController = WicketApplication.getDiscoveryController();
    }

    @Override
    protected void onInitialize() {
        super.onInitialize();
        try {
            Config config = discoveryController.fetchConfig(MANIFEST_URL);

            Map<String, CompletableFuture<MicroFrontendResponse>> futures =
                discoveryController.fetchMfeContents(config, TEASERS_KEY, RECOMMENDATIONS_KEY);

            CompletableFuture.allOf(futures.values().toArray(new CompletableFuture[0])).join();

            addMfePanel("exp_teasers", futures.get(TEASERS_KEY).join());
            addMfePanel("exp_recommendations", futures.get(RECOMMENDATIONS_KEY).join());

            addHydrationScript(config);

        } catch (Exception e) {
            handleError(e);
        }
    }

    private void addMfePanel(String id, MicroFrontendResponse content) {
        if (content == null || content.error() != null) {
            add(new Label(id, "Content unavailable"));
            return;
        }
        add(new RemoteContentPanel(id, content));
    }

    private void addHydrationScript(Config config) {
        try {
            MicroFrontend teasers = config.getMicroFrontends().get(TEASERS_KEY).getFirst();
            MicroFrontend recommendations = config.getMicroFrontends().get(RECOMMENDATIONS_KEY).getFirst();

            String hydrationScript = String.format("""
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
        } catch (Exception e) {
            System.err.println("Failed to add hydration script: " + e.getMessage());
            add(new Label("hydrationScript", ""));
        }
    }

    private void handleError(Exception e) {
        System.err.println("Error initializing page: " + e.getMessage());
        e.printStackTrace();

        add(new Label("exp_teasers", "Content unavailable"));
        add(new Label("exp_recommendations", "Content unavailable"));
        add(new Label("hydrationScript", ""));
    }
}