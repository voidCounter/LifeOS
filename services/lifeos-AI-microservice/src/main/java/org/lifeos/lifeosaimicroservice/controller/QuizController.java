package org.lifeos.lifeosaimicroservice.controller;


import org.lifeos.lifeosaimicroservice.dto.QuizbyPromptDTO;
import org.lifeos.lifeosaimicroservice.service.QuizService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
public class QuizController {
    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/generate-quiz-by-prompt")
    public ResponseEntity<String> getQuiz(@RequestBody QuizbyPromptDTO quizbyPromptDTO) {
        String generatedQuiz =
                String.join("", Objects.requireNonNull(quizService.generateQuizByPrompt(quizbyPromptDTO).collectList().block()));
        return ResponseEntity.status(HttpStatus.OK).body(generatedQuiz);
    }
}
