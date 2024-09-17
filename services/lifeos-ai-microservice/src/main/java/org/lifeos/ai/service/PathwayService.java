package org.lifeos.ai.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.lifeos.ai.dto.StageRequestDTO;
import org.lifeos.ai.dto.pathway.Question;
import org.lifeos.ai.dto.pathway.QuestionDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

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
    private boolean shouldAskQuestion = false;

    @PostConstruct
    public void validateSystemPrompt() {
        if (!systemPromptResource.exists()) {
            log.error("System prompt resource not found: {}", systemPromptResource.getFilename());
        } else {
            log.info("System prompt: {}", systemPromptResource);
        }
    }

    public List<Question> generateQuestions(StageRequestDTO stageRequestDTO) {
        try {
            String generatedQuestions =  this.chatClient
                    .prompt()
                    .system(questionPromptResource)
                    .system(sp -> sp.param ("user_prompt", stageRequestDTO.getPrompt()))
                    .system(sp -> sp.param ("language", stageRequestDTO.getLanguage()))
                    .user(stageRequestDTO.getPrompt())
                    .advisors(new SimpleLoggerAdvisor())
                    .call()
                    .content();

            ObjectMapper objectMapper = new ObjectMapper();
            log.info("Generated questions: {}", generatedQuestions);
            List<Question> questions = objectMapper.readValue(generatedQuestions, new TypeReference<List<Question>>() {});
            return questions;
        } catch (Exception e) {
            log.error("Error generating stage: ", e);
            return null;
        }
    }

    public  generateStages() {

    }

}
