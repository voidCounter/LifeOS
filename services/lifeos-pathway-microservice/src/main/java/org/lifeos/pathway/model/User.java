package org.lifeos.pathway.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.List;
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
    @Column(name="knowledge_xp")
    private BigInteger knowledgeXP;


    @OneToMany(mappedBy = "creator", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToString.Exclude
    private List<Roadmap> createdRoadmaps;
}
