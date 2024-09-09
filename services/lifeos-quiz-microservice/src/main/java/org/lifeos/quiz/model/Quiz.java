package org.lifeos.quiz.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.Type;
import org.hibernate.type.SqlTypes;
import org.lifeos.quiz.dto.*;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.sql.SQLType;
import java.sql.Timestamp;
import java.util.ArrayList;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    private User creator;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "quiz", cascade = CascadeType.ALL)
    @JsonManagedReference
    @ToString.Exclude
    private List<Question> questions;

    private boolean published = false;
    private boolean deleted = false;

    @Type(ListArrayType.class)
    @Column(name = "categories", columnDefinition = "text[]")
    private List<String> categories;

    private String quizDescription;
    private String language;
    @CreationTimestamp
    private Timestamp createdAt;
    @LastModifiedDate
    private Timestamp lastModifiedAt;

    public Quiz(QuizDTO quizDTO,
                User creator) {
        this.quizTitle = quizDTO.getQuizTitle();
        this.quizDescription = quizDTO.getQuizDescription();
        this.categories = quizDTO.getCategories();
        this.creator = creator;
        this.published = quizDTO.isPublished();
    }

    public Quiz() {
    }

    public static Quiz fromDTO(QuizDTO quizDTO, User creator) {
        Quiz quiz = new Quiz();
        quiz.setQuizTitle(quizDTO.getQuizTitle());
        quiz.setQuizDescription(quizDTO.getQuizDescription());
        quiz.setCategories(quizDTO.getCategories());
        quiz.setCreator(creator);
        quiz.setPublished(quizDTO.isPublished());

        // Converting questions
        List<Question> questions = new ArrayList<>();
        for (QuestionDTO questionDTO : quizDTO.getQuestions()) {
            Question question = null;
            if (questionDTO instanceof MultipleChoiceQuestionDTO) {
                question = MultipleChoiceQuestion.fromDTO((MultipleChoiceQuestionDTO) questionDTO);
            } else if (questionDTO instanceof ShortAnswerQuestionDTO) {
                question = ShortAnswerQuestion.fromDTO((ShortAnswerQuestionDTO) questionDTO);
            } else if (questionDTO instanceof TrueFalseQuestionDTO) {
                question = TrueFalseQuestion.fromDTO((TrueFalseQuestionDTO) questionDTO);
            }

            if (question != null) {
                question.setQuestionStatement(questionDTO.getQuestionStatement());
                question.setQuestionDifficulty(QuizDifficulty.valueOf(questionDTO.getQuestionDifficulty()));
                question.setQuestionType(QuestionType.valueOf(questionDTO.getQuestionType()));
                question.setQuiz(quiz);
                questions.add(question);
            }
        }
        quiz.setQuestions(questions);
        return quiz;
    }
}
