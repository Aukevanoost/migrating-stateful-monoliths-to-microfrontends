package com.aukevanoost.presentation.cart;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

public record CartItem(String sku, int price, int quantity) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    public CartItem(String sku, int price) {
        this(sku, price, 1);
    }

    public CartItem quantity(int quantity) {
        return new CartItem(sku(), price(), quantity);
    }

    public CartItem append(int quantity) {
        return new CartItem(sku(), price(), quantity() + quantity);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartItem cartItem = (CartItem) o;
        return sku().equals(cartItem.sku());
    }

    public boolean equals(String sku) {
        return sku().equals(sku);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sku);
    }
}
