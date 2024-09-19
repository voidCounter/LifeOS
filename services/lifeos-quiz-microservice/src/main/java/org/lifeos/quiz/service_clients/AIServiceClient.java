package org.lifeos.quiz.service_clients;

import org.lifeos.quiz.dto.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "lifeos-AI-microservice")
public interface AIServiceClient {
    @PostMapping("/generate-quiz-by-prompt")
    String generateQuizByPrompt(@RequestBody QuizByPromptDTO quizByPromptDTO);

    @PostMapping("/generate-quiz-by-youtube")
    String generateQuizByYoutube(@RequestBody QuizByYoutubeDTO quizByYoutubeDTO);

    @PostMapping("/generate-quiz-by-article")
    String generateQuizByArticle(@RequestBody QuizByArticleDTO quizByArticleDTO);

    @PostMapping("/generate-quiz-by-notes")
    String generateQuizByNotes(@RequestBody QuizByNotesDTO quizByNotesDTO);
}
