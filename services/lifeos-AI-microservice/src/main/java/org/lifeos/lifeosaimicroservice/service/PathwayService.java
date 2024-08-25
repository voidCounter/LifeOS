package org.lifeos.lifeosaimicroservice.service;

import org.lifeos.lifeosaimicroservice.dto.QuizbyPromptDTO;
import org.lifeos.lifeosaimicroservice.dto.StageRequestDTO;
import org.lifeos.lifeosaimicroservice.model.StageType;
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
public class PathwayService {

    private final ChatClient chatClient;
    private static final Logger log = LoggerFactory.getLogger(PathwayService.class);


    @Value("classPath:/prompts/PathwaySystemPrompt.st")
    private Resource systemPromptResource;

    public PathwayService(@Qualifier("pathwayClient") ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @PostConstruct
    public void validateSystemPrompt() {
        if (!systemPromptResource.exists()) {
            log.error("System prompt resource not found: {}", systemPromptResource.getFilename());
        } else {
            log.info("System prompt: {}", systemPromptResource);
        }
    }

    public Flux<String> generateStages(StageRequestDTO stageRequestDTO) {
        try {
            return this.chatClient.prompt()
                    .system(sp -> sp.param("topic", stageRequestDTO.getTopic()))
                    .system(sp -> sp.param("type", StageType.fromValue(stageRequestDTO.getStageType()).toString()))
                    .system(sp -> sp.param("noOfSubStages", stageRequestDTO.getNoOfSubStages()))
                    .system(sp -> sp.param("language", stageRequestDTO.getLanguage()))
                    .user(stageRequestDTO.getConstraints())
                    .stream()
                    .content();
        } catch (Exception e) {
            log.error("Error generating stage: ", e);
            return Flux.error(e);
        }
    }

}
