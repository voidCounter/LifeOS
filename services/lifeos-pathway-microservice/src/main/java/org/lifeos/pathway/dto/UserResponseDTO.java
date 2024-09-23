package org.lifeos.pathway.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class UserResponseDTO {
    private UUID userId;
    private String username;
}
