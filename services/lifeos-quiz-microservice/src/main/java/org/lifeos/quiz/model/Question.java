package org.lifeos.quiz.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;


@Entity
@Data
@Table(name = "questions")
@Inheritance(strategy = InheritanceType.JOINED)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "questionType")
@JsonSubTypes({
        @JsonSubTypes.Type(value = MultipleChoiceQuestion.class, name = "MULTIPLE_CHOICE"),
        @JsonSubTypes.Type(value = ShortAnswerQuestion.class, name = "SHORT_ANSWER"),
        @JsonSubTypes.Type(value = TrueFalseQuestion.class, name = "TRUE_FALSE")
})
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID questionId;
    private String questionStatement;
    @Enumerated(EnumType.STRING)
    private QuestionType questionType;
    @Enumerated(EnumType.STRING)
    private QuizDifficulty questionDifficulty;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id")
    @JsonBackReference
    private Quiz quiz;
}




