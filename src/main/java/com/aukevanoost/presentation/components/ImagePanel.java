package com.aukevanoost.presentation.components;

import org.apache.wicket.AttributeModifier;
import org.apache.wicket.markup.html.image.ExternalImage;
import org.apache.wicket.markup.html.image.Image;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.request.resource.ContextRelativeResource;
import org.apache.wicket.request.resource.PackageResourceReference;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class ImagePanel extends Panel {


    private final String url;
    private final int[] sizes;

    public ImagePanel(String id, String url, int... sizes) {
        super(id);
        this.url = url;
        this.sizes = sizes;

        setRenderBodyOnly(true);
    }

    @Override
    protected void onInitialize() {
        super.onInitialize();

        var image = new Image("image", new ContextRelativeResource(getImageSize(url, sizes[0])));

        image.add(new AttributeModifier("width", sizes[0]));
        image.add(new AttributeModifier("sizes", sizes[0] + "px"));

        image.add(new AttributeModifier(
            "srcset",
            IntStream.of(sizes)
                .mapToObj(size -> getImageSrcSet(url, size))
                .collect(Collectors.joining(", "))
        ));

        for(String tag : List.of("class", "alt")) {
            if(getMarkupAttributes().get(tag) != null) {
                image.add(new AttributeModifier(tag, getMarkupAttributes().get(tag).toString()));
            }
        }

        add(image);
    }

    private String getImageSize(String url, int size) {
        return url.replace("[size]", String.valueOf(size));
    }

    private String getImageSrcSet(String url, int size) {
        return String.format("%s %dw", this.getImageSize(url, size), size);
    }
}
