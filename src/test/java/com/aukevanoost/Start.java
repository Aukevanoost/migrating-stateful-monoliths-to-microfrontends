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

public class Start {

	public static void main(String[] args) throws Exception {
		System.setProperty("wicket.configuration", "development");

		Server wicketServer = new Server();

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

		// REST
		RestApiServer restServer = new RestApiServer(8081);

//		Runtime.getRuntime().addShutdownHook(new Thread(() -> {
//			try {
//				restServer.stop();
//				wicketServer.stop();
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//		}));

		try {
			wicketServer.start();
			restServer.start();

			wicketServer.join();

		} catch (Exception e) {
			e.printStackTrace();
			System.exit(100);
		}
	}
}