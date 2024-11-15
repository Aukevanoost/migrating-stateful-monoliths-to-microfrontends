package com.aukevanoost.presentation.home;

import com.aukevanoost.interfaces.boundaries.auth.AuthControllerFactory;
import com.aukevanoost.interfaces.boundaries.auth.IAuthController;
import com.aukevanoost.presentation._core.components.RemoteContentPanel;
import com.aukevanoost.presentation._core.layout.BaseTemplate;
import jakarta.servlet.http.Cookie;
import org.apache.wicket.request.cycle.RequestCycle;
import org.apache.wicket.request.http.WebResponse;

public class HomePage extends BaseTemplate {
    private final IAuthController authController;

    public HomePage(){
        super();
        this.authController = AuthControllerFactory.inject();
    }

    protected void onInitialize() {
        super.onInitialize();
        setAuthCookie(authController.generateToken());
        add(new RemoteContentPanel("exp_teasers", "http://localhost:4001/"));
    }

    /**
     * Set the auth token as a cookie, don't try this at home
     * @param token
     */
    private void setAuthCookie(String token) {
        WebResponse response = (WebResponse) RequestCycle.get().getResponse();

        Cookie cookie = new Cookie("auth-token", token);
        cookie.setPath("/");
        cookie.setMaxAge((int) (IAuthController.JWT_EXPIRATION / 1000));
        cookie.setHttpOnly(false);
        cookie.setSecure(true);

        response.addHeader("Set-Cookie",
            String.format("%s=%s; Path=/; Max-Age=%d; Secure; SameSite=Strict",
                "auth-token",
                token,
                (IAuthController.JWT_EXPIRATION / 1000)
            )
        );
    }
}