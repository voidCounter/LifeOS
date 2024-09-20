package org.lifeos.user.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.lifeos.user.dto.AuthRequestDTO;
import org.lifeos.user.dto.JwtTokenDTO;
import org.lifeos.user.model.RefreshToken;
import org.lifeos.user.model.User;
import org.lifeos.user.service.RefreshTokenService;
import org.lifeos.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final UserService userService;
    private final RefreshTokenService refreshTokenService;

    @Value("${jwt.expiration}")
    private int jwtExpirationInMs;

    @Value("${refreshToken.expirationInSeconds}")
    private int refreshTokenExpirationInSeconds;

    public AuthenticationController(UserService userService,
                                    RefreshTokenService refreshTokenService) {
        this.userService = userService;
        this.refreshTokenService = refreshTokenService;
    }

    private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);

    @GetMapping("/")
    public ResponseEntity<?> authTest() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/refresh")
    public ResponseEntity<?> refreshJwtToken(HttpServletRequest request, HttpServletResponse response) {
        Cookie cookie = WebUtils.getCookie(request, "refresh");
        JwtTokenDTO jwtTokenDTO = userService.refreshJwtToken(cookie);
        // setting the jwt token in the response header
        setJwtCookie(response, jwtTokenDTO);
        log.info("Cookie: {}", cookie);
        return ResponseEntity.status(HttpStatus.OK).body(jwtTokenDTO.getUser());
    }

    private void setJwtCookie(HttpServletResponse response, JwtTokenDTO jwtTokenDTO) {
        Cookie jwtCookie = new Cookie("jwt", jwtTokenDTO.getToken());
        jwtCookie.setMaxAge(jwtExpirationInMs / 1000);
        jwtCookie.setPath("/");
        jwtCookie.setDomain("");
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(false);
        response.addCookie(jwtCookie);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody AuthRequestDTO authRequest) {
        User registeredUser = userService.registerUser(authRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequestDTO authRequest, HttpServletResponse response) {
        User user = User.builder()
                .email(authRequest.getEmail())
                .password(authRequest.getPassword())
                .build();

        // Verifying user and creating JWT token
        JwtTokenDTO jwtTokenDTO = userService.verifyUser(user);

        // setting the jwt token in the response header
        setJwtCookie(response, jwtTokenDTO);

        // Creating refresh token, setting it in a cookie and sending it to the client
        RefreshToken refreshToken =
                refreshTokenService.createRefreshToken(authRequest.getEmail());
        Cookie refreshCookie = new Cookie("refresh",
                refreshToken.getTokenId().toString());
        refreshCookie.setMaxAge(refreshTokenExpirationInSeconds);
        refreshCookie.setPath("/");
        refreshCookie.setDomain("");
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(false);
        response.addCookie(refreshCookie);

        return new ResponseEntity<>(jwtTokenDTO.getUser(),
                HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request,
                                        HttpServletResponse response) {
        Cookie jwtCookie = new Cookie("jwt", "");
        jwtCookie.setMaxAge(0);
        jwtCookie.setPath("/");
        jwtCookie.setDomain("");
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(false);
        response.addCookie(jwtCookie);

//        TODO: Implement the logic to delete the refresh token from the database
//        delete the refresh token from database
        Cookie currentRefreshCookie = WebUtils.getCookie(request, "refresh");
        if (currentRefreshCookie != null) {
            userService.deleteRefreshToken(currentRefreshCookie);
        }

        Cookie refreshCookie = new Cookie("refresh", "");
        refreshCookie.setMaxAge(0);
        refreshCookie.setPath("/");
        refreshCookie.setDomain("");
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(false);
        response.addCookie(refreshCookie);

        return ResponseEntity.status(HttpStatus.OK).body("Logged out successfully");
    }
}
