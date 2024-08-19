package org.LifeOS.quiz.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class QuestionDTO {
    private String questionStatement;
    @JsonIgnore
    private String quizId;
    private String questionType;
    private String questionDifficulty;
}
