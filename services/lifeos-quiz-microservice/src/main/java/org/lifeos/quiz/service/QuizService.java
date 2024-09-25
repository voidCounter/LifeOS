package org.lifeos.quiz.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.lifeos.quiz.dto.*;
import org.lifeos.quiz.model.*;
import org.lifeos.quiz.repository.QuizRepository;
import org.lifeos.quiz.repository.QuizTestRepository;
import org.lifeos.quiz.repository.UserRepository;
import org.lifeos.quiz.service_clients.AIServiceClient;
import org.lifeos.quiz.service_clients.ResourceLoaderClient;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashSet;
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
    private final QuizTestRepository quizTestRepository;

    public QuizService(QuizRepository quizRepository,
                       UserRepository userRepository,
                       AIServiceClient aiServiceClient,
                       ResourceLoaderClient resourceLoaderClient,
                       ObjectMapper jacksonObjectMapper,
                       ModelMapper modelMapper,
                       QuizTestRepository quizTestRepository) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.aiServiceClient = aiServiceClient;
        this.resourceLoaderClient = resourceLoaderClient;
        this.jacksonObjectMapper = jacksonObjectMapper;
        this.modelMapper = modelMapper;
        this.quizTestRepository = quizTestRepository;
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
        List<Quiz> gotQuizzes =
                quizRepository.findAllBySearchQuery(queryEmbedding);
        return gotQuizzes.stream().map(quiz -> modelMapper.map(quiz, QuizDTO.class)).toList();
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

    @Transactional
    public QuizTestResultDTO evaluateQuiz(QuizEvaluationDTO quizEvaluationDTO
            , UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Quiz quiz = quizRepository.findById(UUID.fromString(quizEvaluationDTO.getQuizId())).orElseThrow(() -> new RuntimeException("Quiz not found"));

        QuizTestResultDTO quizTestResultDTO = new QuizTestResultDTO();
        List<ShortAnswerQuestionCheckingReqDTO> givenShortAnswers = new ArrayList<>(List.of());

        // getting the shortAnswerqeustions
        givenShortAnswers =
                quizEvaluationDTO.getQuestions().stream().map((item) -> {
                    log.info("item: {}", item.toString());
                    Question question = quiz.getQuestions().stream().filter(q -> q.getQuestionId().equals(UUID.fromString(item.getQuestionId()))).findFirst().orElseThrow(() -> new RuntimeException("Question not found"));
                    ShortAnswerQuestionCheckingReqDTO shortAnswerQuestionCheckingReqDTO = null;
                    if (question instanceof ShortAnswerQuestion) {
                        shortAnswerQuestionCheckingReqDTO =
                                ShortAnswerQuestionCheckingReqDTO.builder().questionId(item.getQuestionId()).question(question.getQuestionStatement()).userAnswer(item.getUserAnswer().getFirst()).correctAnswer(((ShortAnswerQuestion) question).getAnswer()).build();
                    }
                    return shortAnswerQuestionCheckingReqDTO;
                }).toList();

        // checking shortAnswers
        List<ShortAnswerQuestionCheckingResDTO> shortAnswerQuestionEvaluated =
                aiServiceClient.evaluateShortAnswerQuestions(givenShortAnswers);
        // the questions user have tried
        List<QuestionTestResultDTO> questionTestResultDTOS =
                quizEvaluationDTO.getQuestions().stream().map(item -> {
                    // get the question from the quiz
                    Question question =
                            quiz.getQuestions().stream().filter(q -> q.getQuestionId().equals(UUID.fromString(item.getQuestionId()))).findFirst().orElseThrow(() -> new RuntimeException("Question not found"));
                    QuestionTestResultDTO questionTestResultDTO = new QuestionTestResultDTO();
                    questionTestResultDTO.setQuestionId(item.getQuestionId());

                    if (question instanceof MultipleChoiceQuestion) {
                        List<String> answers =
                                ((MultipleChoiceQuestion) question).getOptions().stream().filter(MultipleChoiceOption::isCorrect).map(MultipleChoiceOption::getOptionText).toList();
                        //if all answers presetn in the user answers, then correct
                        questionTestResultDTO.setCorrect(answers.size() == item.getUserAnswer().size() &&
                                new HashSet<>(item.getUserAnswer()).containsAll(answers));
                    } else if (question instanceof TrueFalseQuestion) {
                        questionTestResultDTO.setCorrect(((TrueFalseQuestion) question).isAnswer() == Boolean.parseBoolean(item.getUserAnswer().getFirst()));
                    } else if (question instanceof ShortAnswerQuestion) {
                        // ask AI client to find the similarity
                        shortAnswerQuestionEvaluated.stream().filter(shortAnswerQuestionCheckingResDTO -> shortAnswerQuestionCheckingResDTO.getQuestionId().equals(item.getQuestionId())).findFirst().ifPresent(shortAnswerQuestionCheckingResDTO -> {
                            questionTestResultDTO.setCorrect(shortAnswerQuestionCheckingResDTO.isCorrect());
                            questionTestResultDTO.setComment(shortAnswerQuestionCheckingResDTO.getComment());
                        });
                    }
                    return questionTestResultDTO;
                }).toList();
        quizTestResultDTO.setQuestions(questionTestResultDTOS);

        // no of correct answer
        long correctAnswers =
                questionTestResultDTOS.stream().filter(QuestionTestResultDTO::isCorrect).count();
        QuizTest quizTest =
                QuizTest.builder().quizTestScore((int) correctAnswers).quiz(quiz).user(user).build();

        // saving the quiz test info
        QuizTest newQuizTest = quizTestRepository.save(quizTest);
        if (user.getKnowledgeXP() == null) {
            user.setKnowledgeXP(BigInteger.valueOf(correctAnswers));
        } else {
            user.setKnowledgeXP(user.getKnowledgeXP().add(BigInteger.valueOf(correctAnswers)));
        }
        // updating user xp
        userRepository.save(user);

        // building the dto that will be included with quizTestResultDTO
        QuizTestDTO quizTestDTO = modelMapper.map(newQuizTest, QuizTestDTO.class);
        quizTestResultDTO.setQuizTest(quizTestDTO);
        return quizTestResultDTO;
    }

    public List<QuizTestDTO> getQuizTests(UUID userId) {
        List<QuizTest> quiztests =
                quizTestRepository.findAllByUser(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")));
//        log.info("quiztests: {}");
        return quiztests.stream().map(item -> modelMapper.map(item,
                QuizTestDTO.class)).toList();
    }

    public QuizTestDTO getQuizTest(String quizTestId) {
        QuizTest quizTest =
                quizTestRepository.findById(UUID.fromString(quizTestId)).orElseThrow(() -> new RuntimeException("Quiz test not found"));
        return modelMapper.map(quizTest, QuizTestDTO.class);
    }
}
