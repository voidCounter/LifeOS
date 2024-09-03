package org.lifeos.user.dto;

import lombok.Data;
import org.lifeos.user.model.User;

import java.math.BigInteger;
import java.util.UUID;

@Data
public class UserDTO {
    private UUID userId;
    private String name;
    private String username;
    private String email;
    private BigInteger knowledgeXp;

    public UserDTO(User user) {
        this.userId = user.getUserId();
        this.name = user.getName();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.knowledgeXp = user.getKnowledgeXp();
    }
}
