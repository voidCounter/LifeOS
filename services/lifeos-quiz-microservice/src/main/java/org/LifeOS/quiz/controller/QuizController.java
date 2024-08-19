package org.LifeOS.quiz.controller;

import org.LifeOS.quiz.dto.QuizDTO;
import org.LifeOS.quiz.model.Question;
import org.LifeOS.quiz.model.Quiz;
import org.LifeOS.quiz.service.QuizService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/quizzes")
public class QuizController {
    private static final Logger log = LoggerFactory.getLogger(QuizController.class);
    // get all question under a quizset
    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
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

    @PostMapping("/{quizId}/questions/new")
    public ResponseEntity<?> addNewQuiz(@RequestBody QuizDTO quizDTO) {
        try {
            log.info("Adding quiz -> controller: {}", quizDTO);
            quizService.addQuiz(quizDTO);
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
