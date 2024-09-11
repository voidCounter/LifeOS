package org.lifeos.quiz.dto;

import lombok.Data;

@Data
public class QuizbyPromptDTO {
    private String quizTitle;
    private String quizDescription;
    private String questionsDifficulty;
    private String prompt;
    private String questionsType;
    private String numberOfQuestions;
    private String language;
}



