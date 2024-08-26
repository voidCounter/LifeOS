package org.lifeos.gateway.config;

import io.jsonwebtoken.Jwt;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.lifeos.gateway.model.CustomUserDetails;
import org.lifeos.gateway.service.CustomUserDetailsService;
import org.lifeos.gateway.service.JWTService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {
    private final JWTService jwtService;
    private final CustomUserDetailsService customUserDetailsService;

    public JWTAuthenticationFilter(JWTService jwtService,
                                   CustomUserDetailsService customUserDetailsService) {
        this.jwtService = jwtService;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader("Authorization");

        String userId = null;
        String jwt = null;

        // Bearer 45xyUjHgT...
        if (authorizationHeader != null && authorizationHeader.startsWith(
                "Bearer ")) {
            jwt = authorizationHeader.substring(7);
            userId = jwtService.extractUserId(jwt);
        }

        if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            CustomUserDetails userDetails =
                    customUserDetailsService.loadUserByUserId(userId);
            if (jwtService.validateToken(jwt, userDetails)) {
                // creating an authenticated Authentication object to store
                // in the SecurityContextHolder
                UsernamePasswordAuthenticationToken token =
                        new UsernamePasswordAuthenticationToken(userDetails,
                                null, userDetails.getAuthorities());

                // adding additional request info to the token
                token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // storing the token in the SecurityContextHolder
                SecurityContextHolder.getContext().setAuthentication(token);
            }
        }
        filterChain.doFilter(request, response);
    }
}