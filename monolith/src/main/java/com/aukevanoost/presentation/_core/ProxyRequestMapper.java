package com.aukevanoost.presentation._core;

import org.apache.wicket.request.*;
import org.apache.wicket.request.http.WebResponse;
import org.apache.wicket.protocol.http.servlet.ServletWebRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.Set;

public class ProxyRequestMapper implements IRequestMapper {
    private static final Logger log = LoggerFactory.getLogger(ProxyRequestMapper.class);
    private static final Set<String> EXCLUDED_HEADERS = new HashSet<>(Arrays.asList(
        "host", "connection", "content-length", "transfer-encoding"
    ));
    private static final Duration TIMEOUT = Duration.ofSeconds(30);

    private final String[] proxyPaths;
    private final String backendUrl;
    private final HttpClient httpClient;

    public ProxyRequestMapper(String backendUrl, String... paths) {
        this.proxyPaths = paths;
        this.backendUrl = normalizeBackendUrl(backendUrl);
        this.httpClient = HttpClient.newBuilder()
            .followRedirects(HttpClient.Redirect.NORMAL)
            .connectTimeout(TIMEOUT)
            .build();
    }

    private String normalizeBackendUrl(String url) {
        return url.endsWith("/") ? url.substring(0, url.length() - 1) : url;
    }

    @Override
    public IRequestHandler mapRequest(Request request) {
        String url = request.getUrl().toString();
        if (!shouldProxy(url)) {
            return null;
        }

        log.debug("Proxying request: {}", url);
        return createProxyRequestHandler(url);
    }

    private IRequestHandler createProxyRequestHandler(String url) {
        return requestCycle -> {
            WebResponse response = (WebResponse) requestCycle.getResponse();
            ServletWebRequest webRequest = (ServletWebRequest) requestCycle.getRequest();
            HttpServletRequest servletRequest = webRequest.getContainerRequest();

            try {
                String fullUrl = buildTargetUrl(url);
                HttpRequest proxyRequest = buildProxyRequest(fullUrl, servletRequest);
                executeProxyRequest(proxyRequest, response);
            } catch (Exception e) {
                handleProxyError(e, response);
            }
        };
    }

    private String buildTargetUrl(String url) {
        return url.isEmpty() ? backendUrl : backendUrl + "/" + url;
    }

    private HttpRequest buildProxyRequest(String fullUrl, HttpServletRequest servletRequest)
        throws URISyntaxException {
        HttpRequest.Builder builder = HttpRequest.newBuilder()
            .uri(new URI(fullUrl))
            .method(servletRequest.getMethod(),
                servletRequest.getMethod().equals("GET") ?
                    HttpRequest.BodyPublishers.noBody() :
                    HttpRequest.BodyPublishers.ofInputStream(() -> {
                        try {
                            return servletRequest.getInputStream();
                        } catch (IOException e) {
                            log.error("Failed to read request body", e);
                            return InputStream.nullInputStream();
                        }
                    }));

        copyHeaders(servletRequest, builder);
        return builder.build();
    }

    private void copyHeaders(HttpServletRequest request, HttpRequest.Builder builder) {
        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            String headerNameLower = headerName.toLowerCase();

            if (!shouldExcludeHeader(headerNameLower)) {
                builder.header(headerName, request.getHeader(headerName));
            }
        }
    }

    private boolean shouldExcludeHeader(String headerName) {
        return headerName.startsWith("sec-") || EXCLUDED_HEADERS.contains(headerName);
    }

    private void executeProxyRequest(HttpRequest proxyRequest, WebResponse response)
        throws IOException, InterruptedException {
        HttpResponse<InputStream> proxyResponse = httpClient.send(
            proxyRequest,
            HttpResponse.BodyHandlers.ofInputStream()
        );

        response.setStatus(proxyResponse.statusCode());
        copyResponseHeaders(proxyResponse, response);
        copyResponseBody(proxyResponse, response);
    }

    private void copyResponseHeaders(HttpResponse<?> proxyResponse, WebResponse response) {
        proxyResponse.headers().map().forEach((name, values) ->
            values.forEach(value -> response.addHeader(name, value)));
    }

    private void copyResponseBody(HttpResponse<InputStream> proxyResponse, WebResponse response)
        throws IOException {
        try (InputStream is = proxyResponse.body();
             OutputStream os = response.getOutputStream()) {
            is.transferTo(os);
        }
    }

    private void handleProxyError(Exception e, WebResponse response) {
        log.error("Proxy request failed", e);
        response.setStatus(HttpServletResponse.SC_BAD_GATEWAY);
    }

    private boolean shouldProxy(String url) {
        String normalizedUrl = normalizeUrl(url);

        for (String path : proxyPaths) {
            if (path.isEmpty() && normalizedUrl.isEmpty()) {
                return true;
            }
            if (!path.isEmpty() && normalizedUrl.startsWith(path)) {
                return true;
            }
        }
        return false;
    }

    private String normalizeUrl(String url) {
        if (url == null || url.equals("/")) {
            return "";
        }
        return url;
    }

    @Override
    public int getCompatibilityScore(Request request) {
        return shouldProxy(request.getUrl().toString()) ? 1 : 0;
    }

    @Override
    public Url mapHandler(IRequestHandler requestHandler) {
        return null;
    }
}