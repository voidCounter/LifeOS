package org.LifeOS.quiz.model;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@JsonTypeName("TRUE_FALSE")
@Getter
@Setter
@Entity
@Table(name = "true_false_questions")
public class TrueFalseQuestion extends Question {
    private boolean answer;
    private String trueOptionExplanation;
    private String falseOptionExplanation;
}
