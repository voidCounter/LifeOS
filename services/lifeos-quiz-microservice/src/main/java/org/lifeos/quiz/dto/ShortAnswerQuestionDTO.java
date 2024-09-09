package org.lifeos.quiz.dto;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.lifeos.quiz.model.ShortAnswerQuestion;

@JsonTypeName("SHORT_ANSWER")
@EqualsAndHashCode(callSuper = true)
@Data
public class ShortAnswerQuestionDTO extends QuestionDTO {
    private String answer;
    private String answerExplanation;

    public static ShortAnswerQuestionDTO fromModel(ShortAnswerQuestion shortAnswerQuestion) {
        ShortAnswerQuestionDTO dto = new ShortAnswerQuestionDTO();
        dto.setAnswer(shortAnswerQuestion.getAnswer());
        dto.setAnswerExplanation(shortAnswerQuestion.getAnswerExplanation());
        return dto;
    }
}
