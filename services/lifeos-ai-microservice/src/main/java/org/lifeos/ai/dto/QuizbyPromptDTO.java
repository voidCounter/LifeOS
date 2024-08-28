package org.lifeos.ai.dto;

import lombok.Data;

@Data
public class QuizbyPromptDTO {
    private String quizTitle;
    private String quizDescription;
    private String questionCount;
    private String questionsDifficulty;
    private String prompt;
    private String questionsType;
    private String language;
}
