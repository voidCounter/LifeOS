package org.lifeos.quiz.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.lifeos.quiz.model.*;
import org.springframework.data.annotation.TypeAlias;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class QuizDTO {
    private String quizId;
    private String quizTitle;
    private String quizDescription;
    private List<String> categories;
    private boolean published;
    private List<QuestionDTO> questions;

    public static QuizDTO fromModel(Quiz quiz) {
        QuizDTO quizDTO = new QuizDTO();
        quizDTO.setQuizId(quiz.getQuizId().toString());
        quizDTO.setQuizTitle(quiz.getQuizTitle());
        quizDTO.setQuizDescription(quiz.getQuizDescription());
        quizDTO.setCategories(quiz.getCategories());
        quizDTO.setPublished(quiz.isPublished());

        // Convert questions
        List<QuestionDTO> questionDTOs = new ArrayList<>();
        for (Question question : quiz.getQuestions()) {
            if (question instanceof MultipleChoiceQuestion) {
                questionDTOs.add(MultipleChoiceQuestionDTO.fromModel((MultipleChoiceQuestion) question));
            } else if (question instanceof ShortAnswerQuestion) {
                questionDTOs.add(ShortAnswerQuestionDTO.fromModel((ShortAnswerQuestion) question));
            } else if (question instanceof TrueFalseQuestion) {
                questionDTOs.add(TrueFalseQuestionDTO.fromModel((TrueFalseQuestion) question));
            }
        }
        quizDTO.setQuestions(questionDTOs);
        return quizDTO;
    }
}