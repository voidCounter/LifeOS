package org.lifeos.quiz.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuizEvaluationDTO {
    private String quizId;
    private List<QuestionEvaluationDTO> questions;
}
