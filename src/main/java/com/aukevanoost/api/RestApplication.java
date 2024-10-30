package com.aukevanoost.api;

import com.aukevanoost.api.resources.FeaturedResource;
import jakarta.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

public class RestApplication extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new HashSet<>();
        resources.add(FeaturedResource.class);
        return resources;
    }
}