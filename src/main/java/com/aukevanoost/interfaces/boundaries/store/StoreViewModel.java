package com.aukevanoost.interfaces.boundaries.store;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public record StoreViewModel(List<StoreDTO> stores) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
}
