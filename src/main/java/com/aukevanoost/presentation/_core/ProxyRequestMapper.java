package com.aukevanoost.presentation._core;

import org.apache.wicket.request.*;
import org.apache.wicket.request.http.WebResponse;

import org.apache.wicket.protocol.http.servlet.ServletWebRequest;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Enumeration;

public class ProxyRequestMapper implements IRequestMapper {
    private final String[] proxyPaths;
    private final String backendUrl;
    private final HttpClient httpClient;

    public ProxyRequestMapper(String backendUrl, String... paths) {
        this.proxyPaths = paths;
        this.backendUrl = backendUrl.endsWith("/") ? backendUrl.substring(0, backendUrl.length() - 1) : backendUrl;
        this.httpClient = HttpClient.newBuilder()
            .followRedirects(HttpClient.Redirect.NORMAL)
            .build();
    }

    @Override
    public IRequestHandler mapRequest(Request request) {

        String url = request.getUrl().toString();
        // Check if this URL should be proxied
        if (shouldProxy(url)) {
            System.out.println("Is proxying: " + url);

            return requestCycle -> {
                WebResponse response = (WebResponse) requestCycle.getResponse();
                ServletWebRequest webRequest = (ServletWebRequest) requestCycle.getRequest();
                HttpServletRequest servletRequest = webRequest.getContainerRequest();

                try {
                    // Build the proxy request
                    String fullUrl = backendUrl + "/" + url;
//                    String method = servletRequest.getMethod();
                    HttpRequest.Builder proxyRequestBuilder = HttpRequest.newBuilder()
                        .uri(URI.create(fullUrl))
                        .method("GET", HttpRequest.BodyPublishers.noBody());

                    // Copy request headers
                    Enumeration<String> headerNames = servletRequest.getHeaderNames();
                    while (headerNames.hasMoreElements()) {
                        String headerName = headerNames.nextElement();
                        String headerNameLower = headerName.toLowerCase();
                        if (!headerNameLower.startsWith("sec-") &&
                            !headerNameLower.equals("host") &&  // Skip host header
                            !headerNameLower.equals("connection") &&  // Skip connection header
                            !headerNameLower.equals("content-length") &&  // Skip content-length
                            !headerNameLower.equals("transfer-encoding")) {  // Skip transfer-encoding
                            proxyRequestBuilder.header(headerName,
                                servletRequest.getHeader(headerName));
                        }
                    }
                    //proxyRequestBuilder.header("Host", URI.create(backendUrl).getHost());

                    HttpResponse<InputStream> proxyResponse = httpClient.send(
                        proxyRequestBuilder.build(),
                        HttpResponse.BodyHandlers.ofInputStream());

                    response.setStatus(proxyResponse.statusCode());

                    // Copy response headers
                    proxyResponse.headers().map().forEach((name, values) -> {
                        values.forEach(value -> response.addHeader(name, value));
                    });

                    // Copy response body
                    try (InputStream is = proxyResponse.body();
                         OutputStream os = response.getOutputStream()) {
                        is.transferTo(os);
                    }
                } catch (Exception e) {
                    System.out.println("Failed: " + e.getMessage());
                    e.printStackTrace();

                    response.setStatus(HttpServletResponse.SC_BAD_GATEWAY);
                }
            };
        }
        return null;
    }

    private boolean shouldProxy(String url) {
        for (String path : proxyPaths) {
            if (url.startsWith(path)) {
                return true;
            }
        }
        return false;
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