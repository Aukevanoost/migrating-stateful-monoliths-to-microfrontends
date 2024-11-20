package com.aukevanoost.interfaces.discovery.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Deployment {
    private int traffic;
    private boolean isDefault;
    private boolean production;

    public int getTraffic() { return traffic; }
    public void setTraffic(int traffic) { this.traffic = traffic; }
    @JsonProperty("default")
    public boolean isDefault() { return isDefault; }
    @JsonProperty("default")
    public void setDefault(boolean isDefault) { this.isDefault = isDefault; }
    public boolean isProduction() { return production; }
    public void setProduction(boolean production) { this.production = production; }
}
