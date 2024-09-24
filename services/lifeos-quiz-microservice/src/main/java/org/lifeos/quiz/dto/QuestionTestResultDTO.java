package org.lifeos.quiz.dto;

import lombok.Data;

@Data
public class QuestionTestResultDTO {
    private String questionId;
    private boolean isCorrect;
    private String comment;
}
