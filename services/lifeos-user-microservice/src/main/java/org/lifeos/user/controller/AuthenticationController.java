package org.lifeos.user.controller;

import org.lifeos.user.dto.AuthRequestDTO;
import org.lifeos.user.model.User;
import org.lifeos.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final UserService userService;
    public AuthenticationController(UserService userService) {
        this.userService = userService;
    }
    private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);

    @GetMapping("/")
    public ResponseEntity<?> authTest() {
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody AuthRequestDTO authRequest) {
        User newUser = new User(authRequest.getEmail(),
                authRequest.getPassword());
        User registeredUser = userService.saveUser(newUser);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequestDTO authRequest) {
        User user = new User(authRequest.getEmail(),
                authRequest.getPassword());
        return new ResponseEntity<>(userService.verifyUser(user),
                HttpStatus.OK);
    }
}
