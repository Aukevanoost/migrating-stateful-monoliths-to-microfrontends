package com.aukevanoost.interfaces.boundaries.discovery;

import com.aukevanoost.interfaces.discovery.models.Config;
import com.aukevanoost.interfaces.discovery.models.MicroFrontendResponse;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

public interface IDiscoveryController {
    Config fetchConfig(String url)  throws Exception;
    Map<String, CompletableFuture<MicroFrontendResponse>>  fetchMfeContents(Config config, String... mfeKeys);
}
