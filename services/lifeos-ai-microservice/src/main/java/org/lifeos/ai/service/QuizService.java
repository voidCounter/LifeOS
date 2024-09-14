package org.lifeos.ai.service;

import org.lifeos.ai.dto.RetrievalQueryDTO;
import org.lifeos.ai.dto.quiz.QuizByPromptDTO;
import org.lifeos.ai.dto.quiz.QuizByYoutubeDTO;
import org.lifeos.ai.service_clients.ResourceLoaderClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.AdvisedRequest;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;

@Service
public class QuizService {
    private static final Logger log = LoggerFactory.getLogger(QuizService.class);
    private final ChatClient chatClient;
    private final ResourceLoaderClient resourceLoaderClient;
    private final FileService fileService;


    @Value("classPath:/prompts/QuizSystemPrompt.st")
    private Resource systemPromptResource;
    @Value("classPath:/prompts/ResourceExtraPrompt.st")
    private Resource resourceExtraPrompt;


    public QuizService(@Qualifier("quizClient") ChatClient chatClient,
                       ResourceLoaderClient resourceLoaderClient,
                       FileService fileService) {
        this.chatClient = chatClient;
        this.resourceLoaderClient = resourceLoaderClient;
        this.fileService = fileService;
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
        // load youtube transcript
        ResponseEntity<String> loadingResponse =
                resourceLoaderClient.loadTranscript(quizByYoutubeDTO.getYoutubeUrl());
        log.info("Response of loading things: {}", loadingResponse.getBody());

        // TODO: Handle the case when the user query is empty
        // retrieve similar chunks based on the prompt
        String similarChunks =
                resourceLoaderClient.retrieve(RetrievalQueryDTO.builder()
                        .query(quizByYoutubeDTO.getPrompt()).fileName(loadingResponse.getBody())
                        .build());

        log.info("Similar chunks: {}", similarChunks);
        log.info("resourceExtraPrompt: {}", fileService.convertResourceToString(resourceExtraPrompt));
        try {
            return this.chatClient.prompt()
                    .advisors(new SimpleLoggerAdvisor(AdvisedRequest::userText,
                            response -> String.valueOf(response.getResult())))
                    .system(sp -> sp.param("numberOfQuestions",
                            quizByYoutubeDTO.getNumberOfQuestions()))
                    .system(sp -> sp.param("language", quizByYoutubeDTO.getLanguage()))
                    .system(sp -> sp.param("questionsType",
                            quizByYoutubeDTO.getQuestionsType()))
                    .system(sp -> sp.param("questionsDifficulty",
                            quizByYoutubeDTO.getQuestionsDifficulty()))
                    .user(quizByYoutubeDTO.getPrompt() + fileService.convertResourceToString(resourceExtraPrompt) + "\n " +
                            "Resource:" +
                            " " + similarChunks)
                    .call()
                    .content();
        } catch (Exception e) {
            log.error("Error generating quiz: ", e);
            return "Error generating quiz";
        }
        // provide the chunks to the chat client and generate quiz
    }
}
