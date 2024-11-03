package com.aukevanoost.presentation;

import com.aukevanoost.presentation.cart.CartState;
import org.apache.wicket.protocol.http.WebSession;
import org.apache.wicket.request.Request;

import java.io.Serial;
import java.util.function.UnaryOperator;

public class StoreSession extends WebSession {
    @Serial
    private static final long serialVersionUID = 1L;

    private CartState cart = CartState.empty();

    public StoreSession(Request request) {
        super(request);
    }

    public static StoreSession get() {
        return (StoreSession) WebSession.get();
    }

    public void updateCart(UnaryOperator<CartState> update) {
        var newCart =  update.apply(cart);
        this.cart = newCart;
        dirty();
    }

    public CartState cart() {
        return this.cart;
    }
}