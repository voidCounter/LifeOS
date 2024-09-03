package org.lifeos.user.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class RefreshTokenDTO {
    private String token;
    private Timestamp expiresIn;
}
