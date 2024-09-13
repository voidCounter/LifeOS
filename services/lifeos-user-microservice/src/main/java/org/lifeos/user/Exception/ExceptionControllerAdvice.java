package org.lifeos.user.Exception;

import org.lifeos.user.dto.FormErrorDTO;
import org.lifeos.user.model.ErrorDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionControllerAdvice {
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<FormErrorDTO> handleBadCredentialException(BadCredentialsException e) {
        return ResponseEntity.badRequest().body(FormErrorDTO.builder().field(
                "password").message(e.getMessage()).build());
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<FormErrorDTO> handleUserNotFoundException(UserAlreadyExistsException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(FormErrorDTO.builder().field("email").message(e.getMessage()).build());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<FormErrorDTO> handleUserNotFoundException(UserNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(FormErrorDTO.builder().field("email").message(e.getMessage()).build());
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
