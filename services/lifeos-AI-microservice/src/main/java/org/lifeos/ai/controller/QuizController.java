package org.lifeos.ai.controller;


import org.lifeos.ai.dto.QuizbyPromptDTO;
import org.lifeos.ai.service.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
