package org.lifeos.quiz.controller;

import org.lifeos.quiz.dto.QuizDTO;
import org.lifeos.quiz.dto.QuizbyPromptDTO;
import org.lifeos.quiz.model.Quiz;
import org.lifeos.quiz.service.QuizService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
public class QuizController {
    private static final Logger log = LoggerFactory.getLogger(QuizController.class);
    // get all question under a quizset
    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/hello")
    public ResponseEntity<String> hello(@RequestHeader(name = "user-id",
            required = false) UUID userId
    ) {
        log.info("Hello from quiz controller" + userId);
        return ResponseEntity.ok("Hello from quiz controller");
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveQuiz(@RequestBody QuizDTO quizDTO,
                                      @RequestHeader(name = "user-id",
                                              required = false) UUID userId) {
        String quizId = quizService.saveQuiz(quizDTO, userId);
        if (quizId == null || quizId.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Quiz not saved");
        }
        Map<String, String> response = new HashMap<>();
        response.put("quizId", quizId);
        return ResponseEntity.ok(response);
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

    @PostMapping("/create/byprompt")
    public ResponseEntity<?> createQuizByPrompt(@RequestBody QuizbyPromptDTO quizbyPromptDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(quizService.createQuizByPrompt(quizbyPromptDTO));
    }

    @PostMapping("/{quizId}/questions/new")
    public ResponseEntity<?> addNewQuiz(@RequestBody QuizDTO quizDTO,
                                        @RequestHeader("UserID") UUID userId) {
        try {
            log.info("Adding quiz -> controller: {}", quizDTO);
            quizService.addQuiz(quizDTO, userId);
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
