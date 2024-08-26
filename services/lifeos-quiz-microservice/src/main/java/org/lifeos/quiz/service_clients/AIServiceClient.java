package org.lifeos.quiz.service_clients;

import org.lifeos.quiz.dto.QuizbyPromptDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "lifeos-AI-microservice")
public interface AIServiceClient {
    @PostMapping("/generate-quiz-by-prompt")
    String generateQuizByPrompt(@RequestBody QuizbyPromptDTO quizbyPromptDTO);
}
