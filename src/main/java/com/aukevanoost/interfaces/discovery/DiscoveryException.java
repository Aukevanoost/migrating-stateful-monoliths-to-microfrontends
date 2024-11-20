package com.aukevanoost.interfaces.discovery;

public class DiscoveryException extends Exception {
    public DiscoveryException(String message) {
        super(message);
    }

    public DiscoveryException(String message, Throwable cause) {
        super(message, cause);
    }
}
