package org.lifeos.quiz.dto;

import lombok.Data;

@Data
public class ShortAnswerQuestionCheckingResDTO {
    private String questionId;
    private boolean isCorrect;
    private String comment;
}

