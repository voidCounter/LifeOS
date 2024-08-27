package org.lifeos.user.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.lifeos.user.model.CustomUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JWTService {
    private final CustomUserDetailsService userDetailsService;
    private final CustomUserDetailsService customUserDetailsService;

    @Value("${jwt.expiration}")
    private long jwtExpirationInMs;

    public JWTService(CustomUserDetailsService userDetailsService, CustomUserDetailsService customUserDetailsService) {
        this.userDetailsService = userDetailsService;
        this.customUserDetailsService = customUserDetailsService;
    }

    private static final Logger log = LoggerFactory.getLogger(JWTService.class);
    @Value("${secrets.jwt.secret}")
    private String secretKey;

    public String generateToken(String email) {
        CustomUserDetails userDetails =
                userDetailsService.loadUserByUsername(email);
        String userId = userDetails.getUserId();
        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(userId)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
                .and()
                .signWith(getKey())
                .compact();
    }

    private SecretKey getKey() {
        byte[] decodedKey = Base64.getDecoder().decode(secretKey);
        return Keys.hmacShaKeyFor(decodedKey);
    }
}
