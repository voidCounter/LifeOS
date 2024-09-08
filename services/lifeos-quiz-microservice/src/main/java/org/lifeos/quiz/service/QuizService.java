package org.lifeos.quiz.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.lifeos.quiz.dto.GeneratedQuizDTO;
import org.lifeos.quiz.dto.QuestionDTO;
import org.lifeos.quiz.dto.QuizDTO;
import org.lifeos.quiz.dto.QuizbyPromptDTO;
import org.lifeos.quiz.model.*;
import org.lifeos.quiz.repository.QuizRepository;
import org.lifeos.quiz.repository.UserRepository;
import org.lifeos.quiz.service_clients.AIServiceClient;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class QuizService {
    private static final Logger log = LoggerFactory.getLogger(QuizService.class);
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final AIServiceClient aiServiceClient;
    private final ObjectMapper jacksonObjectMapper;

    public QuizService(QuizRepository quizRepository,
                       UserRepository userRepository,
                       AIServiceClient aiServiceClient,
                       ObjectMapper jacksonObjectMapper) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.aiServiceClient = aiServiceClient;
        this.jacksonObjectMapper = jacksonObjectMapper;
    }

    public void addQuiz(QuizDTO quizDTO, UUID userId) {
        User creator =
                userRepository.findById(userId).
                        orElseThrow(() -> new RuntimeException("User not found"));
        Quiz quiz = new Quiz(quizDTO, creator);
        quizRepository.save(quiz);
    }


    public Quiz getQuiz(UUID quizId) {
        return quizRepository.findAllByQuizId(quizId);
    }

    public List<Question> getAllQuestionsByQuizId(UUID quizId) {
        return quizRepository.findAllByQuizId(quizId).getQuestions();
    }

    public GeneratedQuizDTO createQuizByPrompt(QuizbyPromptDTO quizbyPromptDTO) {
        log.info("Creating quiz by prompt: {}", quizbyPromptDTO.getNumberOfQuestions());
        String generatedQuiz =
                aiServiceClient.generateQuizByPrompt(quizbyPromptDTO);
        log.info("Generated Quiz: {}", generatedQuiz);
        try {
            return jacksonObjectMapper.readValue(generatedQuiz, GeneratedQuizDTO.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error parsing quiz Data", e);
        }
    }

    // returns created quiz id
    @Transactional
    public String saveQuiz(QuizDTO quizDTO, UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Quiz quiz = Quiz.fromDTO(quizDTO, user);
        return quizRepository.save(quiz).getQuizId().toString();
    }
}
