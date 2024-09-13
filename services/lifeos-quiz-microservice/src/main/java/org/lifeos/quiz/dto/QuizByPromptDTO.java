package org.lifeos.quiz.dto;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@JsonTypeName("PROMPT")
@Data
public class QuizByPromptDTO extends QuizCreationDTO {
    private String prompt;
}
