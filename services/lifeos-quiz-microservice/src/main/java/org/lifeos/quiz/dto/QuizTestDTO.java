package org.lifeos.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizTestDTO {
    private String quizTestId;
    private QuizDTO quiz;
    private UserDTO user;
    private int quizTestScore;
    private String testTakenAt;
}
