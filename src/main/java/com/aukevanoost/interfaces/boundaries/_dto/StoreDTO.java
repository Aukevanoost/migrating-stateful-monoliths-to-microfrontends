package com.aukevanoost.interfaces.boundaries._dto;

import com.aukevanoost.domain.entities.Store;

import java.io.Serial;
import java.io.Serializable;

public record StoreDTO(
    String id,
    String name,
    String street,
    String city,
    String image
) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    public static StoreDTO from(Store store) {
        return new StoreDTO(
            store.id(),
            store.name(),
            store.street(),
            store.city(),
            store.image()
        );
    }

    public static final String ID = "id";
    public static final String NAME = "name";
    public static final String STREET = "street";
    public static final String CITY = "city";
    public static final String IMAGE = "image";
}
