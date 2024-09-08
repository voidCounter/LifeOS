package org.lifeos.quiz.dto;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@JsonTypeName("SHORT_ANSWER")
@EqualsAndHashCode(callSuper = true)
@Data
public class ShortAnswerQuestionDTO extends QuestionDTO {
    private String answer;
    private String answerExplanation;
}
