package org.lifeos.user.Exception;

import org.apache.coyote.Response;
import org.lifeos.user.dto.AuthErrorDTO;
import org.lifeos.user.dto.AuthRequestDTO;
import org.lifeos.user.model.ErrorDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionControllerAdvice {
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<AuthErrorDTO> handleBadCredentialException(BadCredentialsException e) {
        return ResponseEntity.badRequest().body(AuthErrorDTO.builder().field(
                "password").message(e.getMessage()).build());
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<AuthErrorDTO> handleUserNotFoundException(UserAlreadyExistsException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(AuthErrorDTO.builder().field("email").message(e.getMessage()).build());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<AuthErrorDTO> handleUserNotFoundException(UserNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(AuthErrorDTO.builder().field("email").message(e.getMessage()).build());
    }


    @ExceptionHandler(NoRefreshCookieFoundException.class)
    public ResponseEntity<ErrorDetails> handleNoRefreshCookieFoundException(NoRefreshCookieFoundException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorDetails(e.getMessage()));
    }

    @ExceptionHandler(ExpiredRefreshTokenException.class)
    public ResponseEntity<ErrorDetails> handleExpiredRefreshTokenException(ExpiredRefreshTokenException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorDetails(e.getMessage()));
    }
}
