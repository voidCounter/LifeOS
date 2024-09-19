package org.lifeos.ai.service;

import org.lifeos.ai.dto.RetrievalQueryDTO;
import org.lifeos.ai.dto.quiz.*;
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
import java.util.List;
import java.util.Objects;

@Service
public class QuizService {
    private static final Logger log = LoggerFactory.getLogger(QuizService.class);
    private final ChatClient chatClient;
    private final ResourceLoaderClient resourceLoaderClient;
    private final FileService fileService;


    @Value("classpath:/prompts/QuizSystemPrompt.st")
    private Resource systemPromptResource;
    @Value("classpath:/prompts/ResourceExtraPrompt.st")
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

    public String generateQuiz(QuizCreationDTO quizCreationDTO, String userPrompt) {
        try {
            return this.chatClient.prompt()
                    .advisors(new SimpleLoggerAdvisor())
                    .system(sp -> sp.param("numberOfQuestions",
                            quizCreationDTO.getNumberOfQuestions()))
                    .system(sp -> sp.param("language", quizCreationDTO.getLanguage()))
                    .system(sp -> sp.param("questionsType",
                            quizCreationDTO.getQuestionsType()))
                    .system(sp -> sp.param("questionsDifficulty",
                            quizCreationDTO.getQuestionsDifficulty()))
                    .user(userPrompt)
                    .call()
                    .content();
        } catch (Exception e) {
            log.error("Error generating quiz: ", e);
            return "Error generating quiz";
        }
    }

    public String generateQuizByPrompt(QuizByPromptDTO quizbyPromptDTO) {
        return generateQuiz(quizbyPromptDTO, quizbyPromptDTO.getPrompt());
    }

    public String generateQuizByYoutube(QuizByYoutubeDTO quizByYoutubeDTO) {
        // load youtube transcript
        ResponseEntity<String> loadingResponse =
                resourceLoaderClient.loadYoutubeTranscript(quizByYoutubeDTO.getYoutubeUrl());
        log.info("Response of loading things: {}", loadingResponse.getBody());

        // TODO: Handle the case when the user query is empty
        // retrieve similar chunks based on the prompt
        String similarChunks =
                resourceLoaderClient.retrieve(RetrievalQueryDTO.builder()
                        .query(quizByYoutubeDTO.getPrompt()).fileNames(List.of(Objects.requireNonNull(loadingResponse.getBody())))
                        .build());

        // provide the chunks to the chat client and generate quiz
        return generateQuiz(quizByYoutubeDTO,
                quizByYoutubeDTO.getPrompt() + "\n " + fileService.convertResourceToString(resourceExtraPrompt) + "\n " + "Resource: \n" + similarChunks);

    }

    public String generateQuizByArticle(QuizByArticleDTO quizByArticleDTO) {
        // load article content
        ResponseEntity<String> loadingResponse =
                resourceLoaderClient.loadWebArticle(quizByArticleDTO.getArticleUrl());

        // retrieve similar chunks based on the prompt
        String similarChunks =
                resourceLoaderClient.retrieve(RetrievalQueryDTO.builder()
                        .query(quizByArticleDTO.getPrompt()).fileNames(List.of(Objects.requireNonNull(loadingResponse.getBody())))
                        .build());

        // provide the chunks to the chat client and generate quiz
        String generatedQuiz = generateQuiz(quizByArticleDTO,
                quizByArticleDTO.getPrompt() + "\n " + fileService.convertResourceToString(resourceExtraPrompt) + "\n " + "Resource: \n" + similarChunks);
        if (generatedQuiz.startsWith("```json")) {
            generatedQuiz = generatedQuiz.substring(8, generatedQuiz.length() - 3);
        }
        return generatedQuiz;
    }

    public String generateQuizByNotes(QuizByNotesDTO quizByNotesDTO) {
        // retrieve similar chunks based on the given prompt and file names
        log.info("Retrieving similar chunks for quiz by notes: {}",
                quizByNotesDTO.toString());
        String similarChunks =
                resourceLoaderClient.retrieve(RetrievalQueryDTO.builder()
                        .query(quizByNotesDTO.getPrompt()).fileNames(quizByNotesDTO.getFiles())
                        .build());

        log.info("Similar chunks: {}", similarChunks);

        // provide the chunks to the chat client and generate quiz
        return generateQuiz(quizByNotesDTO,
                quizByNotesDTO.getPrompt() + "\n " + fileService.convertResourceToString(resourceExtraPrompt) + "\n " + "Resource: \n" + similarChunks);
    }
}
