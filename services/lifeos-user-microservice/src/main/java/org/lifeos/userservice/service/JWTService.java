package org.lifeos.userservice.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.lifeos.userservice.model.CustomUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JWTService {
    private final CustomUserDetailsService userDetailsService;
    private final CustomUserDetailsService customUserDetailsService;

    public JWTService(CustomUserDetailsService userDetailsService, CustomUserDetailsService customUserDetailsService) {
        this.userDetailsService = userDetailsService;
        this.customUserDetailsService = customUserDetailsService;
    }

    private static final Logger log = LoggerFactory.getLogger(JWTService.class);
    @Value("${secrets.jwt.secret}")
    private String secretKey;

    public String generateToken(String username) {
        CustomUserDetails userDetails =
                userDetailsService.loadUserByUsername(username);
        String userId = userDetails.getUserId();
        Map<String, Object> claims = new HashMap<>();
        log.info("Secret key during generation: {}", secretKey);

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(userId)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
                .and()
                .signWith(getKey())
                .compact();
    }

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
