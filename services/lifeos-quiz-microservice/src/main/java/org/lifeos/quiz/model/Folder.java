package org.lifeos.quiz.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "folders")
public class Folder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID folderId;
    private String folderTitle;
    @ManyToOne()
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User creator;
    @CreationTimestamp
    private Timestamp createdAt;
}
