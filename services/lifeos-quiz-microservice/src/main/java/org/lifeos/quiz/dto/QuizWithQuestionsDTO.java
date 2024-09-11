package org.lifeos.quiz.dto;

import lombok.Data;
import org.lifeos.quiz.model.*;

import java.util.ArrayList;
import java.util.List;

@Data
public class QuizWithQuestionsDTO {
    private String quizId;
    private String quizTitle;
    private String quizDescription;
    private String language;
    private List<String> categories;
    private boolean published;
    private List<QuestionDTO> questions;

    public static QuizWithQuestionsDTO fromModel(Quiz quiz) {
        QuizWithQuestionsDTO quizWithQuestionsDTO = new QuizWithQuestionsDTO();
        quizWithQuestionsDTO.setQuizId(quiz.getQuizId().toString());
        quizWithQuestionsDTO.setQuizTitle(quiz.getQuizTitle());
        quizWithQuestionsDTO.setQuizDescription(quiz.getQuizDescription());
        quizWithQuestionsDTO.setCategories(quiz.getCategories());
        quizWithQuestionsDTO.setPublished(quiz.isPublished());

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
        quizWithQuestionsDTO.setQuestions(questionDTOs);
        return quizWithQuestionsDTO;
    }
}