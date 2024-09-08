package com.aukevanoost.presentation.template;

import com.aukevanoost.presentation.layout.FooterPanel;
import com.aukevanoost.presentation.layout.HeaderPanel;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.Component;
import org.apache.wicket.request.mapper.parameter.PageParameters;

public class BaseTemplate extends WebPage {
    public static final String CONTENT_ID = "contentComponent";

    private Component headerPanel;
    private Component footerPanel;

    public BaseTemplate(){

        add(headerPanel = new HeaderPanel("headerPanel"));
        add(footerPanel = new FooterPanel("footerPanel"));

    }

    public BaseTemplate(PageParameters parameters) {
        super(parameters);
        add(headerPanel = new HeaderPanel("headerPanel"));
        add(footerPanel = new FooterPanel("footerPanel"));
    }

    //getters for layout areas
    //...
}