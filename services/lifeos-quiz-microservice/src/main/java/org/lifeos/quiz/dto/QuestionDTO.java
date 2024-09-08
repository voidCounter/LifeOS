package org.lifeos.quiz.dto;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;

@Data

@JsonTypeInfo(use = JsonTypeInfo.Id.DEDUCTION, property =
        "questionType")
@JsonSubTypes({
        @JsonSubTypes.Type(value = MultipleChoiceQuestionDTO.class, name = "MULTIPLE_CHOICE"),
        @JsonSubTypes.Type(value = ShortAnswerQuestionDTO.class, name = "SHORT_ANSWER"),
        @JsonSubTypes.Type(value = TrueFalseQuestionDTO.class, name = "TRUE_FALSE")
})
public class QuestionDTO {
    private String questionStatement;
    private String quizId;
    private String questionType;
    private String questionDifficulty;
}
