package org.lifeos.ai.service;

import org.lifeos.ai.dto.StageRequestDTO;
import org.lifeos.ai.dto.pathway.SubStageGenerationDTO;
import org.lifeos.ai.dto.pathway.TaskGenerationDTO;
import org.lifeos.ai.model.StageType;
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
    private final ChatClient subStageGenerationClient;

    @Value("classpath:/prompts/PathwaySystemPrompt.st")
    private Resource systemPromptResource;

    @Value("classpath:/prompts/PathwayQuestionPrompt.st")
    private Resource questionPromptResource;

    @Value("classpath:/prompts/TaskGenerationPrompt.st")
    private Resource taskGenerationPromptResource;

    @Value("classpath:/prompts/PathwayStageGenerateByName.st")
    private Resource stageGenerateByNameResource;

    public PathwayService(
            @Qualifier("pathwayClient") ChatClient chatClient,
            @Qualifier("subStageGenerationClient") ChatClient subStageGenerationClient
    ){
        this.chatClient = chatClient;
        this.subStageGenerationClient = subStageGenerationClient;
    }

    @PostConstruct
    public void validateQuestionPrompt() {
        if (!questionPromptResource.exists()) {
            log.error("Question prompt resource not found: {}", questionPromptResource.getFilename());
        } else {
            log.info("Question prompt: {}", questionPromptResource);
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

    @PostConstruct
    public void validateTaskGenerationPrompt() {
        if (!taskGenerationPromptResource.exists()) {
            log.error("Task generation prompt resource not found: {}", taskGenerationPromptResource.getFilename());
        } else {
            log.info("Task generation prompt: {}", taskGenerationPromptResource);
        }
    }

    @PostConstruct
    public void validateStageGenerationByPrompt() {
        if (!stageGenerateByNameResource.exists()) {
            log.error("Stage generation  by name resource not found: {}", taskGenerationPromptResource.getFilename());
        } else {
            log.info("Stage generation by name resource: {}", taskGenerationPromptResource);
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

    


    public String generateSubStageByPrompt(SubStageGenerationDTO subStageGenerationDTO) {
        log.info("Generating roadmap for: {}", subStageGenerationDTO);
        try {
            String stageType = StageType.fromValue(subStageGenerationDTO.getType()).getValue();
            return this.subStageGenerationClient
                    .prompt()
                    .system(systemPromptResource)
                    .system(sp -> sp.param("type", stageType))
                    .system(sp -> sp.param ("context", subStageGenerationDTO.getContext()))
                    .system(sp -> sp.param ("language", subStageGenerationDTO.getLanguage()))
                    .user(" ")
                    .call()
                    .content();
        } catch (Exception e) {
            log.error("Error generating roadmap: ", e);
            return "Error generating roadmap";
        }
    }

    public String generateTask(TaskGenerationDTO taskGenerationDTO) {
        try {
            return this.subStageGenerationClient
                    .prompt()
                    .system(taskGenerationPromptResource)
                    .system(sp -> sp.param("title", taskGenerationDTO.getTitle()))
                    .system(sp -> sp.param("description", taskGenerationDTO.getDescription()))
                    .system(sp -> sp.param ("context", taskGenerationDTO.getContext()))
                    .user(taskGenerationDTO.getContext())
                    .advisors(new SimpleLoggerAdvisor())
                    .call()
                    .content();
        } catch (Exception e) {
            log.error("Error generating task: ", e);
            return "Error generating task";
        }
    }

    public String generateSubStageByName(SubStageGenerationDTO subStageGenerationDTO) {
        log.info("Generating: {}", subStageGenerationDTO.getType());
        try {
            String stageType = StageType.fromValue(subStageGenerationDTO.getType()).getValue();
            return this.subStageGenerationClient
                    .prompt()
                    .system(stageGenerateByNameResource)
                    .system(sp -> sp.param("type", stageType))
                    .system(sp -> sp.param ("context", subStageGenerationDTO.getContext()))
                    .system(sp -> sp.param ("language", subStageGenerationDTO.getLanguage()))
                    .user(" ")
                    .call()
                    .content();
        } catch (Exception e) {
            log.error("Error generating roadmap: ", e);
            return "Error generating roadmap";
        }
    }
}
