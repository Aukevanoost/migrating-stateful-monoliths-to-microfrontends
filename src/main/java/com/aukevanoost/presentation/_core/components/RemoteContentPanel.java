package com.aukevanoost.presentation._core.components;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.panel.Panel;

import java.io.Serializable;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class RemoteContentPanel extends Panel implements Serializable {
    private static final long serialVersionUID = 1L;

    public RemoteContentPanel(String id, String remoteUrl) {
        super(id);
        setRenderBodyOnly(true);

        var htmlContent = fetchRemoteContent(remoteUrl);

        Label contentLabel = new Label("content", htmlContent);
        contentLabel.setEscapeModelStrings(false);
        add(contentLabel);
    }

    private String fetchRemoteContent(String url) {
        try {
            HttpClient client = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(30))
                .followRedirects(HttpClient.Redirect.NORMAL)
                .build();

            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url + "/api/render"))
                .timeout(Duration.ofSeconds(30))
                .header("Accept", "text/html")
                .header("User-Agent", "Wicket-SSI-Client")
                .GET()
                .build();

            HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());


            if (response.statusCode() == 200) {
                return response.body();

            } else {
                return "<!-- Failed to load Angular SSR content -->";
            }
        } catch (Exception e) {
            return "<!-- Failed to load content: " + e.getMessage() + " -->";
        }
    }
}