package com.aukevanoost.interfaces.boundaries.stores;

import com.aukevanoost.interfaces.boundaries._dto.StoreDTO;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public record StoresViewModel(List<StoreDTO> stores) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
}
