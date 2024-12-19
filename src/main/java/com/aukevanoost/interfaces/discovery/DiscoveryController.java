package com.aukevanoost.interfaces.discovery;

import com.aukevanoost.interfaces.boundaries.discovery.IDiscoveryController;
import com.aukevanoost.interfaces.discovery.models.Config;
import com.aukevanoost.interfaces.discovery.models.MicroFrontendResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

public class DiscoveryController implements IDiscoveryController {
    private final HttpClient client;
    private final ObjectMapper mapper;

    public DiscoveryController() {
        this.client = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_1_1)
            .connectTimeout(Duration.ofSeconds(5))
            .build();
        this.mapper = new ObjectMapper();
    }

    public Config fetchConfig(String url) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .build();

        HttpResponse<String> response = client.send(request,
            HttpResponse.BodyHandlers.ofString());

        return mapper.readValue(response.body(), Config.class);
    }

    public Map<String, CompletableFuture<MicroFrontendResponse>> fetchMfeContents(Config config, String... mfeKeys) {
        return Stream.of(mfeKeys)
            .collect(HashMap::new,
                (map, key) -> map.put(
                    key,
                    fetchMfeContent(config.getMicroFrontends().get(key).getFirst().getExtras().getSsr().getHtml())
                ),
                Map::putAll
            );
    }

    private CompletableFuture<MicroFrontendResponse> fetchMfeContent(String url) {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("Accept", "text/html")
            .GET()
            .build();

        return client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
            .thenApply(response -> {
                if (response.statusCode() != 200) {
                    throw new RuntimeException("HTTP " + response.statusCode());
                }
                return parseMfeResponse(response.body(), null);
            })
            .exceptionally(e -> parseMfeResponse(null, e));
    }

    private MicroFrontendResponse parseMfeResponse(String response, Throwable error) {
        if (error != null) {
            return new MicroFrontendResponse(null, null, null, error);
        }

        Pattern style_pattern = Pattern.compile("<style ng-app-id=\"([^\"]+)\"[^>]*>(.*?)</style>", Pattern.DOTALL);
        Pattern state_pattern = Pattern.compile("<script id=\"[^\"]+?-state\"[^>]*>(.*?)</script>", Pattern.DOTALL);

        StringBuilder html = new StringBuilder(response);
        String css = "", state = "";
        int start, end;

        Matcher styleMatcher = style_pattern.matcher(html);
        if (styleMatcher.find()) {
            start = styleMatcher.start();
            end = styleMatcher.end();
            css = html.substring(start, end);
            html.delete(start, end);
        }

        Matcher stateMatcher = state_pattern.matcher(html);
        if (stateMatcher.find()) {
            start = stateMatcher.start();
            end = stateMatcher.end();
            state = html.substring(start, end);
            html.delete(start, end);
        }

        return new MicroFrontendResponse(html.toString().trim(), state, css, null);
    }
}