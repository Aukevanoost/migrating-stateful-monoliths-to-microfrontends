package com.aukevanoost.presentation;

import com.aukevanoost.presentation.pages.home.HomePage;
import com.aukevanoost.presentation.pages.category.CategoryPage;
import com.aukevanoost.presentation.pages.stores.StoresPage;
import org.apache.wicket.cdi.CdiConfiguration;
import org.apache.wicket.csp.CSPDirective;
import org.apache.wicket.csp.CSPDirectiveSrcValue;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.protocol.http.WebApplication;

/**
 * Application object for your web application.
 * If you want to run this application without deploying, run the Start class.
 * 
 * @see com.aukevanoost.Start#main(String[])
 */
public class WicketApplication extends WebApplication
{
	/**
	 * @see org.apache.wicket.Application#getHomePage()
	 */
	@Override
	public Class<? extends WebPage> getHomePage()
	{
		return HomePage.class;
	}

	/**
	 * @see org.apache.wicket.Application#init()
	 */
	@Override
	public void init()
	{
		super.init();

		CdiConfiguration cdiConfiguration =
				new CdiConfiguration();
		cdiConfiguration.configure(this);

		getMarkupSettings().setStripWicketTags(true);

		getCspSettings().blocking()
			.add(CSPDirective.STYLE_SRC, CSPDirectiveSrcValue.SELF)
			.add(CSPDirective.STYLE_SRC, "https://fonts.googleapis.com/css")
			.add(CSPDirective.FONT_SRC, "https://fonts.gstatic.com");

		// add your configuration here
		mountPage("/products/${category}", CategoryPage.class);
		mountPage("/products", CategoryPage.class);

		mountPage("/stores", StoresPage.class);
	}
}
