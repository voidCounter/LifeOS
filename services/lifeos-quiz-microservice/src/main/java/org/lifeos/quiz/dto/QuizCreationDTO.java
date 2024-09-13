package org.lifeos.quiz.dto;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;

@JsonTypeInfo(use = JsonTypeInfo.Id.DEDUCTION, property = "creationMethod")
@JsonSubTypes({
        @JsonSubTypes.Type(value = QuizByYoutubeDTO.class, name = "YOUTUBE"),
        @JsonSubTypes.Type(value = QuizByPromptDTO.class, name = "PROMPT"),
})
@Data
public class QuizCreationDTO {
    private String creationMethod;
    private String questionsDifficulty;
    private String questionsType;
    private String numberOfQuestions;
    private String language;
}



