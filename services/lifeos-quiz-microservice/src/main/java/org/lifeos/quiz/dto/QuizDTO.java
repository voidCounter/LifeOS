package org.lifeos.quiz.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.UUID;

@Data
public class QuizDTO {
    private String quizTitle;
    private String quizDescription;
    private String category;
}