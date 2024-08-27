package org.lifeos.user.service;

import org.lifeos.user.dto.JwtTokenDTO;
import org.lifeos.user.dto.UserDTO;
import org.lifeos.user.model.User;
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
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;

    @Value("${jwt.expiration}")
    private long jwtExpirationInMs;

    public UserService(UserRepository userRepository, @Value("${bcrypt" +
            ".strength}") int bcryptStrength,
                       AuthenticationManager authManager, JWTService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder(bcryptStrength);
        this.authManager = authManager;
        this.jwtService = jwtService;
    }

    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode((user.getPassword())));
        return userRepository.save(user);
    }

    public JwtTokenDTO verifyUser(User user) {
        log.info("Verifying user: {}", user.getEmail());
        try {
            Authentication authentication =
                    authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            if (authentication.isAuthenticated()) {
                String jwtToken = jwtService.generateToken(user.getEmail());
                UserDTO userInfo = new UserDTO(getUserByEmail(user.getEmail()));
                return new JwtTokenDTO(jwtToken, jwtExpirationInMs, userInfo);
            }
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Wrong credentials. Invalid " +
                    "email or password");
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
}
