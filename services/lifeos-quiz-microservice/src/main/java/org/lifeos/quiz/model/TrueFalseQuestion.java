package org.lifeos.quiz.model;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.lifeos.quiz.dto.TrueFalseQuestionDTO;

@EqualsAndHashCode(callSuper = true)
@JsonTypeName("TRUE_FALSE")
@Data
@Entity
@Table(name = "true_false_questions")
public class TrueFalseQuestion extends Question {
    private boolean answer;
    private String trueOptionExplanation;
    private String falseOptionExplanation;

    public static TrueFalseQuestion fromDTO(TrueFalseQuestionDTO questionDTO) {
        TrueFalseQuestion question = new TrueFalseQuestion();
        question.setAnswer(questionDTO.isAnswer());
        question.setTrueOptionExplanation(questionDTO.getTrueOptionExplanation());
        question.setFalseOptionExplanation(questionDTO.getFalseOptionExplanation());
        return question;
    }
}
