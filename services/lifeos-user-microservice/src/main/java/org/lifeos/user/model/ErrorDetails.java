package org.lifeos.user.model;

import lombok.Data;

@Data
public class ErrorDetails {
    private String message;

    public ErrorDetails(String message) {
        this.message = message;
    }
}
