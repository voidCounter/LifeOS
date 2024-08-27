package org.lifeos.user.Exception;

import org.apache.coyote.Response;
import org.lifeos.user.model.ErrorDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionControllerAdvice {
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorDetails> handleBadCredentialException(BadCredentialsException e) {
        return ResponseEntity.badRequest().body(new ErrorDetails(e.getMessage()));
    }
}
