package org.lifeos.user.model;

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
    private String name;
    private String email;
    private String password;
    private BigInteger knowledgeXp;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public User() {
    }
}
