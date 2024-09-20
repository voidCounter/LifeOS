package org.lifeos.quiz.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.lifeos.quiz.dto.*;
import org.lifeos.quiz.model.Question;
import org.lifeos.quiz.model.Quiz;
import org.lifeos.quiz.model.User;
import org.lifeos.quiz.repository.QuizRepository;
import org.lifeos.quiz.repository.UserRepository;
import org.lifeos.quiz.service_clients.AIServiceClient;
import org.lifeos.quiz.service_clients.ResourceLoaderClient;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class QuizService {
    private static final Logger log = LoggerFactory.getLogger(QuizService.class);
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final AIServiceClient aiServiceClient;
    private final ObjectMapper jacksonObjectMapper;
    private final ModelMapper modelMapper;
    private final ResourceLoaderClient resourceLoaderClient;

    public QuizService(QuizRepository quizRepository,
                       UserRepository userRepository,
                       AIServiceClient aiServiceClient,
                       ResourceLoaderClient resourceLoaderClient,
                       ObjectMapper jacksonObjectMapper,
                       ModelMapper modelMapper
    ) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.aiServiceClient = aiServiceClient;
        this.resourceLoaderClient = resourceLoaderClient;
        this.jacksonObjectMapper = jacksonObjectMapper;
        this.modelMapper = modelMapper;
    }

    public void addQuiz(QuizWithQuestionsDTO quizWithQuestionsDTO, UUID userId) {
        User creator = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Quiz quiz = Quiz.fromDTO(quizWithQuestionsDTO, creator);

        quizRepository.save(quiz);
    }

    public Quiz getQuiz(UUID quizId) {
        //        log.info("quiz: {}", quiz);
        return quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));
    }


    public List<Question> getAllQuestionsByQuizId(UUID quizId) {
        return quizRepository.findAllByQuizId(quizId).getQuestions();
    }

    @Transactional
    public GeneratedQuizDTO createQuizByPrompt(QuizByPromptDTO quizByPromptDTO) {
        log.info("Creating quiz by prompt: {}", quizByPromptDTO.getNumberOfQuestions());
        String generatedQuiz = aiServiceClient.generateQuizByPrompt(quizByPromptDTO);
        log.info("Generated Quiz: {}", generatedQuiz);
        try {
            return jacksonObjectMapper.readValue(generatedQuiz, GeneratedQuizDTO.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error parsing quiz Data", e);
        }
    }

    public GeneratedQuizDTO createQuizByYoutube(QuizByYoutubeDTO quizCreationDTO) {
        String generatedQuiz =
                aiServiceClient.generateQuizByYoutube(quizCreationDTO);

        log.info("Generated Quiz: {}", generatedQuiz);
        try {
            return jacksonObjectMapper.readValue(generatedQuiz,
                    GeneratedQuizDTO.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error parsing quiz Data", e);
        }
    }

    // returns created quiz id
    @Transactional
    public String saveQuiz(QuizWithQuestionsDTO quizWithQuestionsDTO, UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Quiz quiz = Quiz.fromDTO(quizWithQuestionsDTO, user);
        float[] embedding =
                resourceLoaderClient.getEmbedding(quiz.getQuizTitle() + " " + quiz.getQuizDescription());
        quiz.setEmbedding(embedding);
        return quizRepository.save(quiz).getQuizId().toString();
    }

    public List<QuizDTO> getQuizzesCreatedByUser(UUID reqUserId) {
        User creator =
                userRepository.findById(reqUserId).orElse(null);
        if (creator == null) {
            throw new RuntimeException("User not found");
        }
        return quizRepository.findAllByCreator(creator).stream().map(quiz -> modelMapper.map(quiz, QuizDTO.class)).toList();
    }

    public List<QuizDTO> searchByQuery(String query) {
        float[] queryEmbedding = resourceLoaderClient.getEmbedding(query);
        // TODO: Write a query that will do similarity search
        return List.of();
    }


    public Object createQuizByArticle(QuizByArticleDTO quizByArticleDTO) {
        log.info("Creating quiz by article: {}",
                quizByArticleDTO.getNumberOfQuestions());
        String generatedQuiz = aiServiceClient.generateQuizByArticle(quizByArticleDTO);
        try {
            return jacksonObjectMapper.readValue(generatedQuiz, GeneratedQuizDTO.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error parsing quiz Data", e);
        }
    }

    public Object createQuizByNotes(QuizByNotesDTO quizCreationDTO) {
        // wait for 2 min
        log.info("the files: {}",
                quizCreationDTO.getFiles());
        String generatedQuiz =
                aiServiceClient.generateQuizByNotes(quizCreationDTO);
        try {
            return jacksonObjectMapper.readValue(generatedQuiz, GeneratedQuizDTO.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error parsing quiz Data", e);
        }

    }
}
