package org.lifeos.quiz.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.Array;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.Type;
import org.hibernate.type.SqlTypes;
import org.lifeos.quiz.dto.*;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

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

    private int numberOfQuestions;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "quiz", cascade =
            CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @ToString.Exclude
    private List<Question> questions;

    private boolean published = false;
    private boolean deleted = false;

    @Type(ListArrayType.class)
    @Column(name = "categories", columnDefinition = "text[]")
    private List<String> categories;

    @Column(name = "embedding")
    @JsonIgnore
    @JdbcTypeCode(SqlTypes.VECTOR)
    @Array(length = 768)
    private float[] embedding;

    private String quizDescription;
    private String language;
    @CreationTimestamp
    private Timestamp createdAt;
    @LastModifiedDate
    private Timestamp lastModifiedAt;

    public Quiz() {
    }

    public static Quiz fromDTO(QuizWithQuestionsDTO quizWithQuestionsDTO, User creator) {
        Quiz quiz = new Quiz();
        quiz.setQuizTitle(quizWithQuestionsDTO.getQuizTitle());
        quiz.setQuizDescription(quizWithQuestionsDTO.getQuizDescription());
        quiz.setCategories(quizWithQuestionsDTO.getCategories());
        quiz.setCreator(creator);
        quiz.setLanguage(quizWithQuestionsDTO.getLanguage());
        quiz.setPublished(quizWithQuestionsDTO.isPublished());
        quiz.setNumberOfQuestions(quizWithQuestionsDTO.getQuestions().size());

        // Converting questions
        List<Question> questions = new ArrayList<>();
        for (QuestionDTO questionDTO : quizWithQuestionsDTO.getQuestions()) {
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
