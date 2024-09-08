package org.lifeos.quiz.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.TypeAlias;

import java.util.List;
import java.util.UUID;

@Data
public class QuizDTO {
    private String quizTitle;
    private String quizDescription;
    private List<String> categories;
    private boolean published;
    private QuestionDTO[] questions;
}