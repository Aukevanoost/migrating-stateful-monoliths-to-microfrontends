package com.aukevanoost.interfaces.boundaries.stores;

import com.aukevanoost.interfaces.boundaries.stores.dto.StoreDTO;

import java.util.List;

public record StoresViewModel(List<StoreDTO> stores) {
    public static StoresViewModel build(List<StoreDTO> stores) {
        return new StoresViewModel(stores);
    }
}
