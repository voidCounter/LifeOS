package org.lifeos.quiz.dto;

import lombok.Data;
import org.lifeos.quiz.model.QuizTest;

import java.util.List;

@Data
public class QuizTestResultDTO {
    private QuizTestDTO quizTest;
    private List<QuestionTestResultDTO> questions;
}
