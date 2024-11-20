package com.aukevanoost.interfaces.boundaries.discovery;

import com.aukevanoost.interfaces.discovery.models.Config;

public interface IDiscoveryController {
    Config fetchConfig(String url)  throws Exception;
}
