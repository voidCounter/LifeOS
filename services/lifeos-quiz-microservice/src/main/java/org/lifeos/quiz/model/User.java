package org.lifeos.quiz.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.math.BigInteger;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID userId;
    private String email;
    private String name;
    @Column(name = "knowledge_xp")
    private BigInteger knowledgeXP;

    @OneToMany(mappedBy = "creator", fetch = FetchType.LAZY)
    private List<Folder> folders;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "creator")
    @ToString.Exclude
    private List<Quiz> createdQuizzes;
}
