package com.aukevanoost;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.ee10.servlet.ServletContextHandler;
import org.eclipse.jetty.ee10.servlet.ServletHolder;
import org.jboss.resteasy.plugins.server.servlet.HttpServletDispatcher;
import org.jboss.resteasy.core.ResteasyDeploymentImpl;

public class RestApiServer {
    private final Server server;
    private final int port;

    public RestApiServer(int port) {
        this.port = port;
        this.server = new Server();
    }

    public void start() throws Exception {
        ServerConnector connector = new ServerConnector(server);
        connector.setPort(port);
        server.addConnector(connector);

        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");

        // RESTEasy configuration
        ResteasyDeploymentImpl deployment = new ResteasyDeploymentImpl();
        deployment.setApplication(new RestApplication());

        ServletHolder servlet = new ServletHolder(new HttpServletDispatcher());
        servlet.setInitParameter("javax.ws.rs.Application", RestApplication.class.getName());
        context.addServlet(servlet, "/api/*");

        context.setAttribute(ResteasyDeploymentImpl.class.getName(), deployment);

        server.setHandler(context);
        server.start();
    }

    public void stop() throws Exception {
        if (server != null) {
            server.stop();
        }
    }

    public boolean isRunning() {
        return server != null && server.isRunning();
    }
}