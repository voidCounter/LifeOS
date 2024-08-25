package org.lifeos.lifeosaimicroservice.controller;


import org.lifeos.lifeosaimicroservice.dto.QuizbyPromptDTO;
import org.lifeos.lifeosaimicroservice.service.QuizService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
public class QuizController {
    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping("/generate-quiz-by-prompt")
    public ResponseEntity<String> getQuiz(@RequestBody QuizbyPromptDTO quizbyPromptDTO) {
        String generatedQuiz =
                quizService.generateQuizByPrompt(quizbyPromptDTO);
        return ResponseEntity.ok(generatedQuiz);
    }
}
