package com.aukevanoost.presentation.cart;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CartState {
    protected final Map<String, CartItem> items;

    protected CartState(Map<String, CartItem> items) {
        this.items = items;
    }

    public static CartState empty() {
        return new CartState(new HashMap<>());
    }

    public static CartState of(List<CartItem> items) {
        return new CartState(
            items.stream().collect(Collectors.toMap(CartItem::sku, Function.identity()))
        );
    }

    public static CartState of(Map<String, CartItem> items) {
        return new CartState(new HashMap<>(items));
    }

    public List<CartItem> items() {
        return List.copyOf(items.values());
    }

    public Stream<CartItem> stream() {
        return items.values().stream();
    }

    public CartState add(CartItem item) {
        var copy = new HashMap<>(items);
        copy.compute(item.sku(), (sku, existingItem) -> {
            if (existingItem != null) {
                return existingItem.append(item.quantity());
            } else {
                return item;
            }
        });
        return new CartState(copy);
    }

    public CartState update(CartItem item) {
        var copy = new HashMap<>(items);
        copy.put(item.sku(), item);
        return new CartState(copy);
    }

    public CartState remove(String sku) {
        var copy = new HashMap<>(items);
        copy.remove(sku);
        return new CartState(copy);
    }
}
