package org.lifeos.user.dto;

import lombok.Data;

@Data
public class AuthRequestDTO {
    private String name;
    private String email;
    private String password;
}
