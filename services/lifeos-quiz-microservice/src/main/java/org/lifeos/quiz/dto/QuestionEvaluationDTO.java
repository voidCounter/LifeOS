package org.lifeos.quiz.dto;

import lombok.Data;
import org.lifeos.quiz.model.QuestionType;

import java.util.List;

@Data
public class QuestionEvaluationDTO {
    private String questionId;
    private QuestionType questionType;
    private List<String> userAnswer;
}
