package com.aukevanoost.api.resources;

import com.aukevanoost.interfaces.boundaries.category.ICategoryController;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/categories")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CategoryResource {
    @Inject
    private transient ICategoryController controller;

    @GET
    public Response get() {
        return Response.ok().entity(controller.process().category()).build();
    }
}
