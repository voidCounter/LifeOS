package org.LifeOS.quiz.dto;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@JsonTypeName("TRUE_FALSE")
@EqualsAndHashCode(callSuper = true)
@Data
public class TrueFalseQuestionDTO extends QuestionDTO {
    private boolean answer;
    private String trueOptionExplanation;
    private String falseOptionExplanation;
}
