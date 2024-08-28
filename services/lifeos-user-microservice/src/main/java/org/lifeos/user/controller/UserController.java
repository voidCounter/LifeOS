package org.lifeos.user.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.lifeos.user.dto.AuthRequestDTO;
import org.lifeos.user.dto.JwtTokenDTO;
import org.lifeos.user.dto.UserDTO;
import org.lifeos.user.model.ErrorDetails;
import org.lifeos.user.model.User;
import org.lifeos.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
import java.util.logging.Logger;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final AuthenticationController authenticationController;
    private final Logger log = Logger.getLogger(UserController.class.getName());

    public UserController(UserService userService, AuthenticationController authenticationController) {
        this.userService = userService;
        this.authenticationController = authenticationController;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserbyId(@PathVariable UUID userId,
                                         @RequestHeader(name = "userId", required = false) String headerUserId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            log.info("User with email: " + userId + " requested by: " + headerUserId);
            return new ResponseEntity<>(new UserDTO(user), HttpStatus.OK);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getUser(@PathVariable String email,
                                     @RequestHeader(name = "userId") String userId) {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            log.info("User with email: " + email + " requested by: " + userId);
            return new ResponseEntity<>(new UserDTO(user), HttpStatus.OK);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }
}
