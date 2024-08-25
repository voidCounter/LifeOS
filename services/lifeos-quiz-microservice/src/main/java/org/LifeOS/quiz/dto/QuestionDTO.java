package org.LifeOS.quiz.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;
import org.LifeOS.quiz.model.MultipleChoiceQuestion;
import org.LifeOS.quiz.model.ShortAnswerQuestion;
import org.LifeOS.quiz.model.TrueFalseQuestion;

@Data

@JsonTypeInfo(use = JsonTypeInfo.Id.DEDUCTION, property =
        "questionType")
@JsonSubTypes({
        @JsonSubTypes.Type(value = MultipleChoiceQuestionDTO.class, name = "MULTIPLE_CHOICE"),
        @JsonSubTypes.Type(value = ShortAnswerDTO.class, name = "SHORT_ANSWER"),
        @JsonSubTypes.Type(value = TrueFalseQuestionDTO.class, name = "TRUE_FALSE")
})
public class QuestionDTO {
    private String questionStatement;
    private String quizId;
    private String questionType;
    private String questionDifficulty;
}
