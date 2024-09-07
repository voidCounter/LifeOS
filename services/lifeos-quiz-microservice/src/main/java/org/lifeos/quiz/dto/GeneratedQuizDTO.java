package org.lifeos.quiz.dto;

import lombok.Data;

import java.util.List;

@Data
public class GeneratedQuizDTO {
    private String quizTitle;
    private String quizDescription;
    private List<String> category;
    private QuestionDTO[] questions;
}
