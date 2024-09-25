package com.aukevanoost.interfaces.boundaries.category;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public record CategoryViewModel(
    String category,
    List<ProductPreviewDTO> products,
    List<CategoryFilterDTO> filters
) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
}
