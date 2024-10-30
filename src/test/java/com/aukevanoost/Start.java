package com.aukevanoost;

import java.lang.management.ManagementFactory;
import javax.management.MBeanServer;

import org.apache.wicket.protocol.ws.javax.WicketServerEndpointConfig;
import org.eclipse.jetty.jmx.MBeanContainer;
import org.eclipse.jetty.server.HttpConfiguration;
import org.eclipse.jetty.server.HttpConnectionFactory;
import org.eclipse.jetty.server.Server;

import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.ee10.servlet.ServletContextHandler;
import org.eclipse.jetty.ee10.webapp.WebAppContext;
import org.eclipse.jetty.ee10.websocket.jakarta.server.config.JakartaWebSocketServletContainerInitializer;
import org.jboss.weld.environment.servlet.Listener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Start {
	private static final Logger log = LoggerFactory.getLogger(Start.class);

	public static void main(String[] args) throws Exception {
		System.setProperty("wicket.configuration", "development");
		log.info("Starting servers...");

		Server wicketServer = null;
		RestApiServer restServer = null;

		try {
			// Initialize Wicket Server
			log.info("Initializing Wicket server on port 8080...");
			wicketServer = new Server();

			HttpConfiguration httpConfig = new HttpConfiguration();
			httpConfig.setSecureScheme("https");
			httpConfig.setSecurePort(8443);
			httpConfig.setOutputBufferSize(32768);

			ServerConnector http = new ServerConnector(wicketServer, new HttpConnectionFactory(httpConfig));
			http.setPort(8080);
			http.setIdleTimeout(1000 * 60 * 60);

			wicketServer.addConnector(http);

			WebAppContext bb = new WebAppContext();
			bb.setServer(wicketServer);
			bb.setContextPath("/");
			bb.setWar("src/main/webapp");

			bb.addEventListener(new Listener());

			ServletContextHandler contextHandler = ServletContextHandler.getServletContextHandler(bb.getServletContext());
			JakartaWebSocketServletContainerInitializer.configure(contextHandler,
				(servletContext, container) -> container.addEndpoint(new WicketServerEndpointConfig()));

			wicketServer.setHandler(bb);

			MBeanServer mBeanServer = ManagementFactory.getPlatformMBeanServer();
			MBeanContainer mBeanContainer = new MBeanContainer(mBeanServer);
			wicketServer.addEventListener(mBeanContainer);
			wicketServer.addBean(mBeanContainer);

			// Initialize REST Server
			log.info("Initializing REST server on port 8081...");
			restServer = new RestApiServer(8081);

			// Start both servers
			log.info("Starting Wicket server...");
			//wicketServer.start();
			log.info("Wicket server started successfully");

			log.info("Starting REST server...");
			//restServer.start();
			log.info("REST server started successfully");

			final Server finalWicketServer = wicketServer;
			final RestApiServer finalRestServer = restServer;

			// Add shutdown hook
			Runtime.getRuntime().addShutdownHook(new Thread(() -> {
				try {
					log.info("Shutting down servers...");
					if (finalRestServer != null) {
						finalRestServer.stop();
					}
					if (finalWicketServer != null) {
						finalWicketServer.stop();
					}
				} catch (Exception e) {
					log.error("Error during shutdown", e);
				}
			}));

			log.info("Both servers started successfully. Press Ctrl+C to stop.");
			//wicketServer.join();

		} catch (Exception e) {
			log.error("Error starting servers", e);

			// Attempt to clean up if startup fails
			try {
				if (restServer != null && restServer.isRunning()) {
					restServer.stop();
				}
				if (wicketServer != null && wicketServer.isRunning()) {
					wicketServer.stop();
				}
			} catch (Exception cleanupException) {
				log.error("Error during cleanup", cleanupException);
			}

			throw e;
		}
	}
}