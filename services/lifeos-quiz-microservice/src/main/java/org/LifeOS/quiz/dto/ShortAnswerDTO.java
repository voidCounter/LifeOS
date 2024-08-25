package org.LifeOS.quiz.dto;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@JsonTypeName("SHORT_ANSWER")
@EqualsAndHashCode(callSuper = true)
@Data
public class ShortAnswerDTO extends QuestionDTO {
    private String answer;
    private String answerExplanation;
}
