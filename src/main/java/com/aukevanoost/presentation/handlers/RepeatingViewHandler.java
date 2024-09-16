package com.aukevanoost.presentation.handlers;


import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.markup.repeater.RepeatingView;

import java.util.List;
import java.util.function.BiFunction;


public class RepeatingViewHandler {
    public static <TDto, UPanel extends Panel> RepeatingView asCards(
        String panelName,
        List<TDto> models,
        BiFunction<String, TDto, UPanel> builder
    ) {
        RepeatingView repeatingView = new RepeatingView(panelName);
        models.forEach(dto -> {
            repeatingView.add(builder.apply(repeatingView.newChildId(), dto));
        });
        return repeatingView;
    }
}
