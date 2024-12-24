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
import java.util.concurrent.Executors;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

public class DiscoveryController implements IDiscoveryController {
    private static volatile DiscoveryController instance;
    private final HttpClient client;
    private final ObjectMapper mapper;

    private DiscoveryController() {
        this.client = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_1_1)
            .connectTimeout(Duration.ofSeconds(10))
            .executor(Executors.newFixedThreadPool(200))
            .build();
        this.mapper = new ObjectMapper();
    }

    public static DiscoveryController getInstance() {
        if (instance == null) {
            synchronized (DiscoveryController.class) {
                if (instance == null) {
                    instance = new DiscoveryController();
                }
            }
        }
        return instance;
    }

    public Config fetchConfig(String url) throws DiscoveryException {
        long startTime = System.nanoTime();

        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Accept", "application/json")
                .header("User-Agent", "DiscoveryService/1.0")
                .GET()
                .build();

            HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());
            long duration = (System.nanoTime() - startTime) / 1_000_000;
            System.out.printf("DISC (%dms)%n", duration);
            return mapper.readValue(response.body(), Config.class);
        } catch (Exception e) {
            throw new DiscoveryException(e);
        }
    }

    public Map<String, CompletableFuture<MicroFrontendResponse>> fetchMfeContents(Config config, String... mfeKeys) {
        return Stream.of(mfeKeys)
            .collect(HashMap::new,
                (map, key) -> {
                    var mfe = config.getMicroFrontends().get(key);
                    if (mfe != null && mfe.getFirst() != null && mfe.getFirst().getExtras() != null) {
                        map.put(key, fetchMfeContent(mfe.getFirst().getExtras().getSsr().getHtml()));
                    }
                },
                Map::putAll
            );
    }

    private CompletableFuture<MicroFrontendResponse> fetchMfeContent(String url) {
        long startTime = System.nanoTime();

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("Accept", "text/html")
            .GET()
            .build();

        return client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
            .thenApply(response -> {
                long duration = (System.nanoTime() - startTime) / 1_000_000;

                if (response.statusCode() != 200) {
                    System.out.printf("HTTP Failed for URL %s: %d (took %dms)%n",
                        url, response.statusCode(), duration);
                } else {
                    System.out.printf("MFE (%dms)%n", duration);
                }

                if (duration > 1000) {
                    System.out.printf("WARNING: Slow request to %s (%dms)%n", url, duration);
                }

                return parseMfeResponse(response.body(), null);
            })
            .exceptionally(e -> {
                long duration = (System.nanoTime() - startTime) / 1_000_000;
                System.out.printf("Request failed for %s after %dms: %s%n",
                    url, duration, e.getMessage());
                return parseMfeResponse(null, e);
            });
    }

    private MicroFrontendResponse parseMfeResponse(String response, Throwable error) {
        if (error != null) {
            return new MicroFrontendResponse(null, null, null, error);
        }

        Pattern stylePattern = Pattern.compile("<style ng-app-id=\"([^\"]+)\"[^>]*>(.*?)</style>", Pattern.DOTALL);
        Pattern statePattern = Pattern.compile("<script id=\"[^\"]+?-state\"[^>]*>(.*?)</script>", Pattern.DOTALL);

        StringBuilder html = new StringBuilder(response);
        String css = "", state = "";
        int start, end;

        Matcher styleMatcher = stylePattern.matcher(html);
        if (styleMatcher.find()) {
            start = styleMatcher.start();
            end = styleMatcher.end();
            css = html.substring(start, end);
            html.delete(start, end);
        }

        Matcher stateMatcher = statePattern.matcher(html);
        if (stateMatcher.find()) {
            start = stateMatcher.start();
            end = stateMatcher.end();
            state = html.substring(start, end);
            html.delete(start, end);
        }

        return new MicroFrontendResponse(html.toString().trim(), state, css, null);
    }
}