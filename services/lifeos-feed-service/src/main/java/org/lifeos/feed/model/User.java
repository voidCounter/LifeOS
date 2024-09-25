package org.lifeos.feed.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonIgnore
    private String password;
    private String username;
    private String avatarUrl;
    @Column(name = "knowledge_xp")
    private BigInteger knowledgeXP;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToString.Exclude
    private List<FeedItem> feedItems;
}
