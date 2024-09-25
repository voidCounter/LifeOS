package org.lifeos.quiz.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ShortAnswerQuestionCheckingReqDTO {
    private String questionId;
    private String question;
    private String correctAnswer;
    private String userAnswer;
}
