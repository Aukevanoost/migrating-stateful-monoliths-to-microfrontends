package com.aukevanoost.presentation;

import com.aukevanoost.presentation._core.ProxyRequestMapper;
import com.aukevanoost.presentation.cart.CartPage;
import com.aukevanoost.presentation.home.HomePage;
import com.aukevanoost.presentation.category.CategoryPage;
import com.aukevanoost.presentation.product.ProductPage;
import com.aukevanoost.presentation.store.StoresPage;
import org.apache.wicket.Session;
import org.apache.wicket.markup.head.filter.JavaScriptFilteredIntoFooterHeaderResponse;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.protocol.http.WebApplication;
import org.apache.wicket.request.Request;
import org.apache.wicket.request.Response;

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

		getMarkupSettings().setStripWicketTags(true);

		getCspSettings().blocking().disabled();
//		getCspSettings().blocking()
//			.remove(CSPDirective.STYLE_SRC)
//			.add(CSPDirective.STYLE_SRC, CSPDirectiveSrcValue.SELF, CSPDirectiveSrcValue.UNSAFE_INLINE)
//			.add(CSPDirective.SCRIPT_SRC, "https://ga.jspm.io", CSPDirectiveSrcValue.UNSAFE_INLINE)
//			.add(CSPDirective.FONT_SRC, CSPDirectiveSrcValue.SELF);

		getHeaderResponseDecorators().add(response ->
			new JavaScriptFilteredIntoFooterHeaderResponse(response, "footer-container"));

		getRootRequestMapperAsCompound().add(new ProxyRequestMapper(
			"http://localhost:4200",
			"home"
		));

		// add your configuration here
		mountPage("/products/#{category}", CategoryPage.class);
		mountPage("/product/${product}/#{variant}", ProductPage.class);
		mountPage("/stores", StoresPage.class);
		mountPage("/cart", CartPage.class);
	}

	@Override
	public Session newSession(Request request, Response response) {
		return new StoreSession(request);
	}
}
