package org.lifeos.ai.service;

import org.lifeos.ai.dto.quiz.QuizByPromptDTO;
import org.lifeos.ai.dto.quiz.QuizByYoutubeDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class QuizService {
    private static final Logger log = LoggerFactory.getLogger(QuizService.class);
    private final ChatClient chatClient;


    @Value("classPath:/prompts/QuizSystemPrompt.st")
    private Resource systemPromptResource;


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


    public String generateQuizByPrompt(QuizByPromptDTO quizbyPromptDTO) {
        try {
            return this.chatClient.prompt()
                    .advisors(new SimpleLoggerAdvisor())
                    .system(sp -> sp.param("numberOfQuestions",
                            quizbyPromptDTO.getNumberOfQuestions()))
                    .system(sp -> sp.param("language", quizbyPromptDTO.getLanguage()))
                    .system(sp -> sp.param("questionsType", quizbyPromptDTO.getQuestionsType()))
                    .system(sp -> sp.param("questionsDifficulty",
                            quizbyPromptDTO.getQuestionsDifficulty()))
                    .user(quizbyPromptDTO.getPrompt())
                    .call()
                    .content();
        } catch (Exception e) {
            log.error("Error generating quiz: ", e);
            return "Error generating quiz";
        }
    }

    public String generateQuizByYoutube(QuizByYoutubeDTO quizByYoutubeDTO) {
        // retrieve chunks based on the query
        // provide the chunks to the chat client and generate quiz
        return "Hello";
    }
}
