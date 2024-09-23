package org.lifeos.ai.controller;


import org.lifeos.ai.dto.quiz.QuizByArticleDTO;
import org.lifeos.ai.dto.quiz.QuizByNotesDTO;
import org.lifeos.ai.dto.quiz.QuizByPromptDTO;
import org.lifeos.ai.dto.quiz.QuizByYoutubeDTO;
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
    public ResponseEntity<String> getQuizByPrompt(@RequestBody QuizByPromptDTO quizCreationDTO,
                                                  @RequestHeader(value = "UserId", required = false) String userId) {
        log.info("Requested by: {}", userId);
        log.info("Request: {}", quizCreationDTO.toString());
        String generatedQuiz =
                quizService.generateQuizByPrompt(quizCreationDTO);
        return ResponseEntity.ok(generatedQuiz);
    }

    @PostMapping("/generate-quiz-by-youtube")
    public ResponseEntity<String> generateQuizByYoutube(@RequestBody QuizByYoutubeDTO quizByYoutubeDTO, @RequestHeader(value = "UserId", required = false) String userId) {
        String generatedQuiz =
                quizService.generateQuizByYoutube(quizByYoutubeDTO);
        return ResponseEntity.ok(generatedQuiz);
    }

    @PostMapping("/generate-quiz-by-article")
    public ResponseEntity<String> generateQuizByArticle(@RequestBody QuizByArticleDTO quizByArticleDTO,
                                                        @RequestHeader(value = "UserId", required = false) String userId) {
        String generatedQuiz =
                quizService.generateQuizByArticle(quizByArticleDTO);
        return ResponseEntity.ok(generatedQuiz);
    }

    @PostMapping("/generate-quiz-by-notes")
    public ResponseEntity<String> generateQuizByArticle(@RequestBody QuizByNotesDTO quizByNotesDTO,
                                                        @RequestHeader(value = "UserId", required = false) String userId) {
        String generatedQuiz =
                quizService.generateQuizByNotes(quizByNotesDTO);
        return ResponseEntity.ok(generatedQuiz);
    }
}
