package com.aukevanoost.interfaces.boundaries.discovery;

import com.aukevanoost.interfaces.discovery.DiscoveryController;

public class DiscoveryControllerFactory {
    public static IDiscoveryController inject() {
        return DiscoveryController.getInstance();
    }
}