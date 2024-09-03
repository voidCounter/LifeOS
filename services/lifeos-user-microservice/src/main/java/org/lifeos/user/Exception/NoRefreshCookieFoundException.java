package org.lifeos.user.Exception;

public class NoRefreshCookieFoundException extends RuntimeException {
    public NoRefreshCookieFoundException(String message) {
        super(message);
    }
}
