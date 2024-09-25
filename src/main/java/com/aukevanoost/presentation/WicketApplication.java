package com.aukevanoost.presentation;

import com.aukevanoost.presentation.home.HomePage;
import com.aukevanoost.presentation.category.CategoryPage;
import com.aukevanoost.presentation.product.ProductPage;
import com.aukevanoost.presentation.store.StoresPage;
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
			.remove(CSPDirective.STYLE_SRC)
			.add(CSPDirective.STYLE_SRC, CSPDirectiveSrcValue.SELF, CSPDirectiveSrcValue.UNSAFE_INLINE)
			.add(CSPDirective.FONT_SRC, CSPDirectiveSrcValue.SELF);

		// add your configuration here
		mountPage("/products/#{category}", CategoryPage.class);
		mountPage("/product/${product}/#{variant}", ProductPage.class);
		mountPage("/stores", StoresPage.class);
	}
}
