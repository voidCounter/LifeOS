package org.lifeos.user.dto;

import lombok.Data;
import org.lifeos.user.model.User;
import org.springframework.beans.factory.annotation.Value;

@Data
public class JwtTokenDTO {
    private String token;
    private String type = "Bearer";
    private UserDTO user;
    private String expiresIn;

    //TODO: Implement refresh token

    public JwtTokenDTO(String token, long expiresIn) {
        this.token = token;
        this.expiresIn = expiresIn / 1000 / 60 + " mins";
    }

    public JwtTokenDTO() {
        this.token = "";
        this.expiresIn = 0 + " mins";
    }

    public JwtTokenDTO(String token, long expiresIn, UserDTO user) {
        this.token = token;
        this.expiresIn = expiresIn/ 1000/ 60 + " mins";
        this.user = user;
    }
}
