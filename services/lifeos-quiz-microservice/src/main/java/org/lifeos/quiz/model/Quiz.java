package org.lifeos.quiz.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@EnableJpaAuditing
@Table(name = "quizzes")
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID quizId;
    private String quizTitle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User creator;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "quiz")
    private List<Question> questions;

    private boolean published = false;
    private boolean deleted = false;

    private String category;
    private String quizDescription;
    private String language;
    @CreationTimestamp
    private Timestamp createdAt;
    @LastModifiedDate
    private Timestamp lastModifiedAt;

    public Quiz(String quizTitle, String quizDescription, String category, User creator) {
        this.quizTitle = quizTitle;
        this.quizDescription = quizDescription;
        this.category = category;
        this.creator = creator;
    }

    public Quiz() {
    }
}
