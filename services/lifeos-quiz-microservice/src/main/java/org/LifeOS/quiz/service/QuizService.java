package org.LifeOS.quiz.service;

import org.LifeOS.quiz.dto.QuizDTO;
import org.LifeOS.quiz.model.Question;
import org.LifeOS.quiz.model.Quiz;
import org.LifeOS.quiz.model.User;
import org.LifeOS.quiz.repository.QuestionRepository;
import org.LifeOS.quiz.repository.QuizRepository;
import org.LifeOS.quiz.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class QuizService {
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;

    public QuizService(QuizRepository quizRepository, UserRepository userRepository) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
    }

    public void addQuiz(QuizDTO quizDTO) {
        User creator =
                userRepository.findById(quizDTO.getCreatorId()).
                        orElseThrow(() -> new RuntimeException("User not found"));
        Quiz quiz = new Quiz(
                quizDTO.getQuizTitle(), quizDTO.getQuizDescription(),
                quizDTO.getCategory(), creator);

        quizRepository.save(quiz);
    }

    public Quiz getQuiz(UUID quizId) {
        return quizRepository.findAllByQuizId(quizId);
    }

    public List<Question> getAllQuestionsByQuizId(UUID quizId) {
        return quizRepository.findAllByQuizId(quizId).getQuestions();
    }
}
