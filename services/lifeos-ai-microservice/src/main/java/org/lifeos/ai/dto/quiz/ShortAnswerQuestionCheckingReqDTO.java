package org.lifeos.ai.dto.quiz;

import lombok.Data;

@Data
public class ShortAnswerQuestionCheckingReqDTO {
    private String questionId;
    private String question;
    private String correctAnswer;
    private String userAnswer;
}
