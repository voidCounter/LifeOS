package org.lifeos.user.service;

import jakarta.servlet.http.Cookie;
import org.lifeos.user.Exception.NoRefreshCookieFoundException;
import org.lifeos.user.Exception.UserAlreadyExistsException;
import org.lifeos.user.Exception.UserNotFoundException;
import org.lifeos.user.dto.AuthRequestDTO;
import org.lifeos.user.dto.JwtTokenDTO;
import org.lifeos.user.dto.UserDTO;
import org.lifeos.user.model.RefreshToken;
import org.lifeos.user.model.User;
import org.lifeos.user.repository.RefreshTokenRepository;
import org.lifeos.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final JWTService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${jwt.expiration}")
    private long jwtExpirationInMs;

    public UserService(UserRepository userRepository, @Value("${bcrypt" + ".strength}") int bcryptStrength, AuthenticationManager authManager, JWTService jwtService, RefreshTokenService refreshTokenService, RefreshTokenRepository refreshTokenRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder(bcryptStrength);
        this.authManager = authManager;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public JwtTokenDTO refreshJwtToken(Cookie refreshTokenCookie) {
        // checking if the refresh token is available in the cookie
        if (refreshTokenCookie == null) {
            throw new NoRefreshCookieFoundException("No refresh token found " + "in the http request");
        }
        String refreshToken = refreshTokenCookie.getValue();
        RefreshToken token = refreshTokenService.findByToken(UUID.fromString(refreshToken)).orElse(null);

        // checking if the token is available in the database
        // TODO: Also check the current authorization header to verify the user
        if (token == null) {
            throw new NoRefreshCookieFoundException("No refresh token found " + "in the database");
        }

        // checking if the token is expired
        token = refreshTokenService.verifyExpiration(token);

        // create a new jwt token
        String newAccessToken = jwtService.generateToken(token.getUser().getEmail());

        return new JwtTokenDTO(newAccessToken, jwtExpirationInMs, new UserDTO(token.getUser()));
    }

    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode((user.getPassword())));
        return userRepository.save(user);
    }

    public JwtTokenDTO verifyUser(User user) {

        User existingUser = getUserByEmail(user.getEmail());
        if (existingUser == null) {
            throw new UserNotFoundException("User with the " + "provided email doesn't " + "exist. Please register.");
        }
        try {
            Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            if (authentication.isAuthenticated()) {
                String jwtToken = jwtService.generateToken(user.getEmail());
                UserDTO userInfo = new UserDTO(getUserByEmail(user.getEmail()));
                return new JwtTokenDTO(jwtToken, jwtExpirationInMs, userInfo);
            }
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Wrong password. Please try " + "again.");
        }
        return new JwtTokenDTO();
    }

    public User getUserById(UUID userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User registerUser(AuthRequestDTO authRequest) {
        User existingUser = getUserByEmail(authRequest.getEmail());
        if (existingUser != null) {
            throw new UserAlreadyExistsException("An user with the provided " + "email already exists.");
        }
        User newUser = User.builder().name(authRequest.getName()).email(authRequest.getEmail()).password(authRequest.getPassword()).build();
        return saveUser(newUser);
    }

    public void deleteRefreshToken(Cookie currentRefreshCookie) {
        if (currentRefreshCookie.getValue() == null) {
            throw new NoRefreshCookieFoundException("No refresh token found " + "in the http request");
        }
        refreshTokenRepository.deleteByToken(currentRefreshCookie.getValue());
    }
}
