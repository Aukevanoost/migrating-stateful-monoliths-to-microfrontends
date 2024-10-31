package com.aukevanoost.api.resources;

import com.aukevanoost.interfaces.boundaries.featured.FeaturedControllerFactory;
import com.aukevanoost.interfaces.boundaries.featured.IFeaturedController;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/featured")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FeaturedResource {
    private transient IFeaturedController controller;

    public FeaturedResource() {
        this.controller = FeaturedControllerFactory.inject();

    }
    @GET
    @Path("/teasers")
    public Response get() {
        return Response.ok().entity(controller.getTeasers()).build();
    }

    @GET
    @Path("/recommendations")
    public Response getRecommendations() {
        return Response.ok().entity(controller.getRecommendations()).build();
    }
}
