package org.lifeos.quiz.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
public class QuizDTO {
    private String quizId;
    private String quizTitle;
    private String quizDescription;
    private int numberOfQuestions;
    private List<String> categories;
    private boolean published;
}
