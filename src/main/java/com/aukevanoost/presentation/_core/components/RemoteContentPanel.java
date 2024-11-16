package com.aukevanoost.presentation._core.components;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.wicket.markup.head.IHeaderResponse;
import org.apache.wicket.markup.head.StringHeaderItem;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.behavior.Behavior;
import org.apache.wicket.Component;

import java.io.Serializable;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;

public class RemoteContentPanel extends Panel implements Serializable {
    private static final long serialVersionUID = 1L;
    private RemoteContent remoteContent;

    public RemoteContentPanel(String id, String remoteUrl) {
        super(id);
        setRenderBodyOnly(true);

        String jsonContent = fetchRemoteContent(remoteUrl);
        parseJsonContent(jsonContent);

        // Add the component content
        String componentContent = remoteContent.comp() != null && !remoteContent.comp().isEmpty()
            ? remoteContent.comp().get(0)
            : "<!-- No component content available -->";

        Label contentLabel = new Label("content", componentContent);
        contentLabel.setEscapeModelStrings(false);
        add(contentLabel);

        // Add body scripts behavior
        if (remoteContent != null && remoteContent.body() != null) {
            add(new BodyScriptsBehavior(
                //remoteContent.body()
                List.of(
                    "\u003Clink rel=\"modulepreload\" href=\"http://localhost:4001/chunk-AIZVJUQQ.js\"\u003E" +
                    "\u003Cscript type=\"esms-options\"\u003E{\"shimMode\":true}\u003C/script\u003E",
                    "\u003Cscript type=\"module\" src=\"http://localhost:4001/polyfills-YJELPHIQ.js\"\u003E\u003C/script\u003E"
                    //"\u003Cscript type=\"module-shim\" src=\"http://localhost:4001/main-SGFQASD5.js\"\u003E\u003C/script\u003E"
                )
            ));
        }
    }






    @Override
    public void renderHead(IHeaderResponse response) {
        super.renderHead(response);

        if (remoteContent == null) return;

        // Only render head content in renderHead
        if (remoteContent.head() != null) {
            response.render(StringHeaderItem.forString("\n"));
            for (String style : remoteContent.head()) {
                response.render(StringHeaderItem.forString(style + "\n"));
            }
        }
    }

    private static class BodyScriptsBehavior extends Behavior {
        private final List<String> scripts;

        public BodyScriptsBehavior(List<String> scripts) {
            this.scripts = scripts;
        }

        @Override
        public void afterRender(Component component) {
            super.afterRender(component);
            if (scripts != null && !scripts.isEmpty()) {
                component.getResponse().write("\n<!-- Body Scripts Start -->\n");
                for (String script : scripts) {
                    component.getResponse().write(script);
                    component.getResponse().write("\n");
                }
                component.getResponse().write("<!-- Body Scripts End -->\n");
            }
        }
    }

    private void parseJsonContent(String jsonContent) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            remoteContent = mapper.readValue(jsonContent, RemoteContent.class);
        } catch (Exception e) {
            error("Failed to parse remote content: " + e.getMessage());
        }
    }

    private String fetchRemoteContent(String url) {
        try {
            HttpClient client = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(30))
                .followRedirects(HttpClient.Redirect.NORMAL)
                .build();

            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .timeout(Duration.ofSeconds(30))
                .header("Accept", "application/json")
                .header("User-Agent", "Wicket-SSI-Client")
                .GET()
                .build();

            HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                return response.body();
            } else {
                return "{\"comp\":[\"<!-- Failed to load Angular SSR content -->\"]}";
            }
        } catch (Exception e) {
            return "{\"comp\":[\"<!-- Failed to load content: " + e.getMessage() + " -->\"]}";
        }
    }

    private static class RemoteContent {
        @JsonProperty("head")
        private List<String> head;

        @JsonProperty("body")
        private List<String> body;

        @JsonProperty("comp")
        private List<String> comp;

        // Getters
        public List<String> head() { return head; }
        public List<String> body() { return body; }
        public List<String> comp() { return comp; }
    }
}