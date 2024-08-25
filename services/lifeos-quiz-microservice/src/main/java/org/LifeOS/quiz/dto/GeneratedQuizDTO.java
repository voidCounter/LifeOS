package org.LifeOS.quiz.dto;

import lombok.Data;

@Data
public class GeneratedQuizDTO {
    private String quizTitle;
    private String quizDescription;
    private String category;
    private QuestionDTO[] questions;
}
