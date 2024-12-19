package com.aukevanoost.interfaces.discovery.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

public class Config {
    private String schema;
    @JsonProperty("microFrontends")
    private Map<String, List<MicroFrontend>> microFrontends;

    public String getSchema() { return schema; }
    public void setSchema(String schema) { this.schema = schema; }
    public Map<String, List<MicroFrontend>> getMicroFrontends() { return microFrontends; }
    public void setMicroFrontends(Map<String, List<MicroFrontend>> microFrontends) { this.microFrontends = microFrontends; }
}