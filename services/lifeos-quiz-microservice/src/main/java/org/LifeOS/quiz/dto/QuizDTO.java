package org.LifeOS.quiz.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class QuizDTO {
    private String quizTitle;
    private String quizDescription;
    private UUID creatorId;
    private String category;
}
