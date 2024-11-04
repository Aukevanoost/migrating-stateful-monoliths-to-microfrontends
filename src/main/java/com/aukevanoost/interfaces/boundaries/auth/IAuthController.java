package com.aukevanoost.interfaces.boundaries.auth;

public interface IAuthController {
    String generateToken();
    boolean validateToken(String token);
}
