package org.lifeos.quiz.dto;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.lifeos.quiz.model.ShortAnswerQuestion;
import org.lifeos.quiz.model.TrueFalseQuestion;

@JsonTypeName("TRUE_FALSE")
@EqualsAndHashCode(callSuper = true)
@Data
public class TrueFalseQuestionDTO extends QuestionDTO {
    private boolean answer;
    private String trueOptionExplanation;
    private String falseOptionExplanation;

    public static TrueFalseQuestionDTO fromModel(TrueFalseQuestion question) {
        TrueFalseQuestionDTO dto = new TrueFalseQuestionDTO();
        dto.setAnswer(question.isAnswer());
        dto.setTrueOptionExplanation(question.getTrueOptionExplanation());
        dto.setFalseOptionExplanation(question.getFalseOptionExplanation());
        return dto;
    }
}
