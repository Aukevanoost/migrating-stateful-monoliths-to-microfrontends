package com.aukevanoost;

import jakarta.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

public class RestApplication extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new HashSet<>();
        // resources.add(TestResource.class);
        return resources;
    }
}