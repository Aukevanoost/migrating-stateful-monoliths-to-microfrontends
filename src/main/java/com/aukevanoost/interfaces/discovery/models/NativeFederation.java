package com.aukevanoost.interfaces.discovery.models;

public class NativeFederation {
    private String remoteEntry;
    private String exposedModule;
    private String element;

    public String getRemoteEntry() { return remoteEntry; }
    public void setRemoteEntry(String remoteEntry) { this.remoteEntry = remoteEntry; }
    public String getExposedModule() { return exposedModule; }
    public void setExposedModule(String exposedModule) { this.exposedModule = exposedModule; }
    public String getElement() { return element; }
    public void setElement(String element) { this.element = element; }
}
