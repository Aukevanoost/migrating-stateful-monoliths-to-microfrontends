package com.aukevanoost.interfaces.boundaries._dto;

import com.aukevanoost.domain.entities.Teaser;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.markup.repeater.RepeatingView;

import java.io.Serial;
import java.io.Serializable;

public record TeaserDTO(
    String title,
    String image,
    String key
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    public static TeaserDTO from(Teaser teaser) {
        return new TeaserDTO(
            teaser.name(),
            teaser.image(),
            teaser.category().key()
        );
    }

    public static final String TITLE = "title";
    public static final String IMAGE = "image";
    public static final String KEY = "key";
}
