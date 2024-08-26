package org.lifeos.gateway.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigInteger;
import java.util.UUID;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID userId;
    private String username;
    private String password;
    private BigInteger knowledgeXp;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User() {
    }
}
