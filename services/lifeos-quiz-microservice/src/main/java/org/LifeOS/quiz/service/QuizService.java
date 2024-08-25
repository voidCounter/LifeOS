package org.LifeOS.quiz.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.LifeOS.quiz.dto.GeneratedQuizDTO;
import org.LifeOS.quiz.dto.QuizDTO;
import org.LifeOS.quiz.dto.QuizbyPromptDTO;
import org.LifeOS.quiz.model.Question;
import org.LifeOS.quiz.model.Quiz;
import org.LifeOS.quiz.model.User;
import org.LifeOS.quiz.repository.QuestionRepository;
import org.LifeOS.quiz.repository.QuizRepository;
import org.LifeOS.quiz.repository.UserRepository;
import org.LifeOS.quiz.service_clients.AIServiceClient;
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
    private final AIServiceClient aiServiceClient;
    private final ObjectMapper jacksonObjectMapper;

    public QuizService(QuizRepository quizRepository, UserRepository userRepository, AIServiceClient aiServiceClient, ObjectMapper jacksonObjectMapper) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.aiServiceClient = aiServiceClient;
        this.jacksonObjectMapper = jacksonObjectMapper;
    }

    public void addQuiz(QuizDTO quizDTO, UUID userId) {
        User creator =
                userRepository.findById(userId).
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

    public GeneratedQuizDTO createQuizByPrompt(QuizbyPromptDTO quizbyPromptDTO) {
        String generatedQuiz =
                aiServiceClient.generateQuizByPrompt(quizbyPromptDTO);

        try {
            return jacksonObjectMapper.readValue(generatedQuiz, GeneratedQuizDTO.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error parsing quiz Data", e);
        }
    }
}
