package org.lifeos.lifeosaimicroservice.service;

import org.lifeos.lifeosaimicroservice.dto.QuizbyPromptDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import javax.annotation.PostConstruct;

@Service
public class QuizService {
    private static final Logger log = LoggerFactory.getLogger(QuizService.class);
    private final ChatClient chatClient;

    @Value("classPath:/prompts/QuizSystemPrompt.st")
    private Resource systemPromptResource;

//    @Value("classPath:/prompts/QuizUserPrompt.st")
//    private Resource userPromptResource;


    public QuizService(@Qualifier("quizClient") ChatClient chatClient) {
        this.chatClient = chatClient;
        log.info("system prompt: {}", chatClient.toString());
    }

    @PostConstruct
    public void validateSystemPrompt() {
        if (!systemPromptResource.exists()) {
            log.error("System prompt resource not found: {}", systemPromptResource.getFilename());
        } else {
            log.info("System prompt: {}", systemPromptResource);
        }
    }


    public String generateQuizByPrompt(QuizbyPromptDTO quizbyPromptDTO) {
        try {
            return this.chatClient.prompt()
                    .system(sp -> sp.param("questionCount", quizbyPromptDTO.getQuestionCount()))
                    .system(sp -> sp.param("language", quizbyPromptDTO.getLanguage()))
                    .system(sp -> sp.param("questionsType", quizbyPromptDTO.getQuestionsType()))
                    .system(sp -> sp.param("questionsDifficulty", quizbyPromptDTO.getQuestionsDifficulty()))
                    .user(quizbyPromptDTO.getPrompt())
                    .call()
                    .content();
        } catch (Exception e) {
            log.error("Error generating quiz: ", e);
            return "Error generating quiz";
        }
    }

}
