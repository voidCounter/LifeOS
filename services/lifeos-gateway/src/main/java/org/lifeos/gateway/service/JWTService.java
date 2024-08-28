package org.lifeos.gateway.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.lifeos.gateway.model.CustomUserDetails;
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

    public JWTService(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    private static final Logger log = LoggerFactory.getLogger(JWTService.class);
    @Value("${secrets.jwt.secret}")
    private String secretKey;

    private SecretKey getKey() {
        byte[] decodedKey = Base64.getDecoder().decode(secretKey);
        return Keys.hmacShaKeyFor(decodedKey);
    }

    public String extractUserId(String jwt) {
        Claims claims = extractAllClaims(jwt);
        return claims.getSubject();
    }

    public Date extractExpiration(String jwt) {
        Claims claims = extractAllClaims(jwt);
        return claims.getExpiration();
    }

    public Claims extractAllClaims(String jwt) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(jwt)
                .getPayload();

    }

    public boolean validateToken(String jwt, CustomUserDetails userDetails) {
        String extractUserId = extractUserId(jwt);
        String userId = userDetails.getUserId();
        return extractUserId.equals(userId) && !isTokenExpired(jwt);
    }

    private boolean isTokenExpired(String jwt) {
        return extractExpiration(jwt).before(new Date());
    }
}
