package com.aukevanoost.interfaces.discovery.models;

import java.io.Serializable;

public record MicroFrontendResponse(String component, String state, String css, Throwable error) implements Serializable {
    private static final long serialVersionUID = 1L;
}
