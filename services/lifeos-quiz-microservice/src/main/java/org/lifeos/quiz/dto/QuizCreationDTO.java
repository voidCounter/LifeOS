package org.lifeos.quiz.dto;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;

@Data
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "creationMethod")
@JsonSubTypes({
        @JsonSubTypes.Type(value = QuizByYoutubeDTO.class, name = "YOUTUBE"),
        @JsonSubTypes.Type(value = QuizByPromptDTO.class, name = "PROMPT"),
        @JsonSubTypes.Type(value = QuizByArticleDTO.class, name = "ARTICLE"),
        @JsonSubTypes.Type(value = QuizByNotesDTO.class, name = "NOTE"),
})
public class QuizCreationDTO {
    private String creationMethod;
    private String questionsDifficulty;
    private String questionsType;
    private String numberOfQuestions;
    private String language;
}



