package com.aukevanoost.interfaces.boundaries.cart;

import com.aukevanoost.interfaces.boundaries.product.ProductDTO;
import jakarta.annotation.Nullable;

import java.util.List;

public interface ICartController {
    List<CartProductPreviewDTO> getCartDetails(CartDTO cart);
}
