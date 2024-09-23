package org.lifeos.quiz.controller;

import org.lifeos.quiz.dto.*;
import org.lifeos.quiz.model.Quiz;
import org.lifeos.quiz.repository.UserRepository;
import org.lifeos.quiz.service.QuizService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
public class QuizController {
    private static final Logger log = LoggerFactory.getLogger(QuizController.class);
    // get all question under a quizset
    private final QuizService quizService;
    private final UserRepository userRepository;

    public QuizController(QuizService quizService, UserRepository userRepository) {
        this.quizService = quizService;
        this.userRepository = userRepository;
    }

    @GetMapping("/hello")
    public ResponseEntity<String> hello(@RequestHeader(name = "user-id",
            required = false) UUID userId
    ) {
        log.info("Hello from quiz controller" + userId);
        return ResponseEntity.ok("Hello from quiz controller");
    }

    @GetMapping("/createdBy/{userId}")
    public ResponseEntity<?> getQuizzesCreatedByUser(@RequestHeader(name =
            "user-id", required = false) UUID reqUserId,
                                                     @PathVariable UUID userId) {
        log.info("userids: {}", reqUserId + " " + userId);
        if (!reqUserId.equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ErrorDTO.builder().message("You're not authorized to view the quizzes").build());
        }

        return ResponseEntity.ok(quizService.getQuizzesCreatedByUser(reqUserId));
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveQuiz(@RequestBody QuizWithQuestionsDTO quizWithQuestionsDTO,
                                      @RequestHeader(name = "user-id",
                                              required = false) UUID userId) {
        String quizId = quizService.saveQuiz(quizWithQuestionsDTO, userId);
        if (quizId == null || quizId.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Quiz not saved");
        }
        Map<String, String> response = new HashMap<>();
        response.put("quizId", quizId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchQuizzes(@RequestParam String query) {
        List<QuizDTO> quizzes = quizService.searchByQuery(query);
        log.info("query: {}", query);
        return ResponseEntity.ok(quizzes);
    }

    @GetMapping("/{quizId}")
    public ResponseEntity<Quiz> getQuizWithQuestions(@PathVariable UUID quizId) {
        try {
            Quiz quiz = quizService.getQuiz(quizId);
//            log.info("Quiz: {}", quizDTO);
            return ResponseEntity.ok(quiz);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

//    @GetMapping("/{quizId}/questions")
//    public ResponseEntity<Quiz> getQuiz(@PathVariable UUID quizId) {
//        try {
//            Quiz quiz = quizService.getQuiz(quizId);
//            return ResponseEntity.ok(quiz);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
//        }
//    }

    @PostMapping("/create")
    public ResponseEntity<?> createQuiz(@RequestBody QuizCreationDTO quizCreationDTO) {
        if (quizCreationDTO instanceof QuizByPromptDTO)
            return ResponseEntity.status(HttpStatus.OK)
                    .body(quizService.createQuizByPrompt((QuizByPromptDTO) quizCreationDTO));
        else if (quizCreationDTO instanceof QuizByYoutubeDTO)
            return ResponseEntity.status(HttpStatus.OK)
                    .body(quizService.createQuizByYoutube((QuizByYoutubeDTO) quizCreationDTO));
        else if (quizCreationDTO instanceof QuizByArticleDTO)
            return ResponseEntity.status(HttpStatus.OK)
                    .body(quizService.createQuizByArticle((QuizByArticleDTO) quizCreationDTO));
        else if (quizCreationDTO instanceof QuizByNotesDTO)
            return ResponseEntity.status(HttpStatus.OK)
                    .body(quizService.createQuizByNotes((QuizByNotesDTO) quizCreationDTO));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
    }

    @PostMapping("/{quizId}/questions/new")
    public ResponseEntity<?> addNewQuiz(@RequestBody QuizWithQuestionsDTO quizWithQuestionsDTO,
                                        @RequestHeader("UserID") UUID userId) {
        try {
            log.info("Adding quiz -> controller: {}", quizWithQuestionsDTO);
            quizService.addQuiz(quizWithQuestionsDTO, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body("Quiz added " +
                    "successfully");
        } catch (Exception e) {
            log.error("An error occurred while adding quiz", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An error " +
                    "occurred while " +
                    "adding quiz");
        }
    }
}
