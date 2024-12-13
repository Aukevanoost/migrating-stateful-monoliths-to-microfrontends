package com.aukevanoost.presentation._core.components;

import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.model.LoadableDetachableModel;

import java.io.Serial;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class RemoteContentPanel extends Panel {
    @Serial
    private static final long serialVersionUID = 1L;
    private final String remoteUrl;
    private static final HttpClient client = HttpClient.newBuilder()
        .version(HttpClient.Version.HTTP_1_1)
        .connectTimeout(Duration.ofSeconds(10))
        .build();

    public RemoteContentPanel(String id, String remoteUrl) {
        super(id);
        this.remoteUrl = remoteUrl;
    }

    @Override
    protected void onInitialize() {
        super.onInitialize();

        add(new Label("content", new LoadableDetachableModel<String>() {
            @Override
            protected String load() {
                return fetchContent();
            }
        }).setEscapeModelStrings(false));
    }

    private String fetchContent() {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(remoteUrl))
                .header("Accept", "text/html")
                .GET()
                .build();

            HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

            return response.statusCode() == 200 ? response.body() :
                "<div class='error'>Error: " + response.statusCode() + "</div>";
        } catch (Exception e) {
            return "<div class='error'>Failed: " + e.getMessage() + "</div>";
        }
    }
}