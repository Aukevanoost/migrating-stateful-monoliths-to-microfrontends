package com.aukevanoost.interfaces.discovery;

public class DiscoveryException extends Exception {
    public DiscoveryException(Throwable cause) {
        super(cause);
    }

    public DiscoveryException(String message, Throwable cause) {
        super(message, cause);
    }
}
