package org.LifeOS.quiz.model;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@JsonTypeName("SHORT_ANSWER")
@Getter
@Setter
@Table(name = "short_answer_questions")
public class ShortAnswerQuestion extends Question {
    private String answer;
    private String explanation;
}
