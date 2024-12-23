package com.aukevanoost.interfaces.discovery.models;

public class MicroFrontend {
    private String url;
    private Metadata metadata;
    private Deployment deployment;
    private Extras extras;

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public Metadata getMetadata() { return metadata; }
    public void setMetadata(Metadata metadata) { this.metadata = metadata; }
    public Deployment getDeployment() { return deployment; }
    public void setDeployment(Deployment deployment) { this.deployment = deployment; }
    public Extras getExtras() { return extras; }
    public void setExtras(Extras extras) { this.extras = extras; }
}
