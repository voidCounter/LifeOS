package org.lifeos.userservice.controller;

import org.apache.coyote.Response;
import org.lifeos.userservice.dto.AuthRequestDTO;
import org.lifeos.userservice.model.User;
import org.lifeos.userservice.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class UserController {
    private final UserService userService;
    private final AuthenticationController authenticationController;

    public UserController(UserService userService, AuthenticationController authenticationController) {
        this.userService = userService;
        this.authenticationController = authenticationController;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody AuthRequestDTO authRequest) {
        User newUser = new User(authRequest.getUsername(),
                authRequest.getPassword());
        User registeredUser = userService.saveUser(newUser);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody AuthRequestDTO authRequest) {
        User user = new User(authRequest.getUsername(),
                authRequest.getPassword());
        String jwt = userService.verifyUser(user);
        if (jwt.isEmpty()) {
            return new ResponseEntity<>(jwt, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(jwt, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUser(@PathVariable UUID userId) {
        User user = userService.getUserById(userId);
        if(user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    @GetMapping
}
