package org.lifeos.ai.service;

import org.lifeos.ai.dto.StageRequestDTO;
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
public class PathwayService {

    private final ChatClient chatClient;
    private static final Logger log = LoggerFactory.getLogger(PathwayService.class);

    @Value("classpath:/prompts/PathwaySystemPrompt.st")
    private Resource systemPromptResource;

    @Value("classpath:/prompts/PathwayQuestionPrompt.st")
    private Resource questionPromptResource;


    public PathwayService(@Qualifier("pathwayClient") ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @PostConstruct
    public void validateQuestionPrompt() {
        if (!questionPromptResource.exists()) {
            log.error("Question prompt resource not found: {}", questionPromptResource.getFilename());
        } else {
            log.info("System prompt: {}", systemPromptResource);
        }
    }

    @PostConstruct
    public void validateSystemPrompt() {
        if (!systemPromptResource.exists()) {
            log.error("System prompt resource not found: {}", systemPromptResource.getFilename());
        } else {
            log.info("System prompt: {}", systemPromptResource);
        }
    }

    public String generatePathwayQuestions(StageRequestDTO stageRequestDTO) {
        try {
            return this.chatClient
                    .prompt()
                    .system(questionPromptResource)
                    .system(sp -> sp.param ("user_prompt", stageRequestDTO.getPrompt()))
                    .system(sp -> sp.param ("language", stageRequestDTO.getLanguage()))
                    .user(stageRequestDTO.getPrompt())
                    .advisors(new SimpleLoggerAdvisor())
                    .call()
                    .content();
        } catch (Exception e) {
            log.error("Error generating stage: ", e);
            return "Error generating questions";
        }
    }


    public String generatePathwayByPrompt(StageRequestDTO stageRequestDTO) {
        try {
            return this.chatClient
                    .prompt()
                    .system(systemPromptResource)
                    .system(sp -> sp.param ("user_prompt", stageRequestDTO.getPrompt()))
                    .system(sp -> sp.param ("language", stageRequestDTO.getLanguage()))
                    .user(stageRequestDTO.getPrompt())
                    .advisors(new SimpleLoggerAdvisor())
                    .call()
                    .content();
        } catch (Exception e) {
            log.error("Error generating stage: ", e);
            return "Error generating pathway";
        }
    }
}
