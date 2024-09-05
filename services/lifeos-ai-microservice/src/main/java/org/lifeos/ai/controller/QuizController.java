package org.lifeos.ai.controller;


import org.lifeos.ai.dto.QuizbyPromptDTO;
import org.lifeos.ai.service.QuizService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class QuizController {
    private static final Logger log = LoggerFactory.getLogger(QuizController.class);
    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping("/generate-quiz-by-prompt")
    public ResponseEntity<String> getQuiz(@RequestBody QuizbyPromptDTO quizbyPromptDTO, @RequestHeader("UserId") String userId) {
        log.info("Requested by: {}", userId);
        log.info("Requested Question number: {}", quizbyPromptDTO.getNumberOfQuestions());
        String generatedQuiz =
                quizService.generateQuizByPrompt(quizbyPromptDTO);
        return ResponseEntity.ok(generatedQuiz);
    }
}
