package org.lifeos.quiz.model;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.lifeos.quiz.dto.ShortAnswerQuestionDTO;

@JsonTypeName("SHORT_ANSWER")
@Getter
@Setter
@Table(name = "short_answer_questions")
@Entity
public class ShortAnswerQuestion extends Question {
    private String answer;
    private String answerExplanation;

    public static ShortAnswerQuestion fromDTO(ShortAnswerQuestionDTO questionDTO) {
        ShortAnswerQuestion question = new ShortAnswerQuestion();
        question.setAnswer(questionDTO.getAnswer());
        question.setAnswerExplanation(questionDTO.getAnswerExplanation());
        return question;
    }
}
