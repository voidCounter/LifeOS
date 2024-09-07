package org.lifeos.quiz.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.lifeos.quiz.dto.QuizDTO;
import org.lifeos.quiz.dto.QuizbyPromptDTO;
import org.lifeos.quiz.model.Quiz;
import org.lifeos.quiz.service.QuizService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Enumeration;
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
    public ResponseEntity<String> saveQuiz(@RequestBody QuizDTO quizDTO) {
        log.info("Quiz: {}", quizDTO);
        return ResponseEntity.ok("Quiz saved successfully");
    }

    @GetMapping("/{quizId}/questions")
    public ResponseEntity<Quiz> getQuiz(@PathVariable UUID quizId) {
        try {
            Quiz quiz = quizService.getQuiz(quizId);
            return ResponseEntity.ok(quiz);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

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
