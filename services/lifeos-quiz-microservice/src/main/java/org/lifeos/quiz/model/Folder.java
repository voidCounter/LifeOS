package org.lifeos.quiz.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name="folders")
public class Folder {
    @Id
    private UUID folderId;
    private String folderTitle;
    @ManyToOne()
    @JoinColumn(name="user_id")
    private User creator;
    @CreationTimestamp
    private Timestamp createdAt;
}
