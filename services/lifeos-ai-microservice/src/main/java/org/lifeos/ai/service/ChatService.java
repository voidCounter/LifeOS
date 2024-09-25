package org.lifeos.ai.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.lifeos.ai.dto.chat.ChatDTO;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class ChatService {

    private static final Logger log = LoggerFactory.getLogger(ChatService.class);

    private final ChatClient chatClient;
    private final ObjectMapper jacksonObjectMapper;

    @Value("classpath:/prompts/ChatPrompt.st")
    private Resource chatPromptResource;


    public ChatService(
            @Qualifier("chatClient") ChatClient chatClient,
            ObjectMapper jacksonObjectMapper
    ) {
        this.chatClient = chatClient;
        this.jacksonObjectMapper = jacksonObjectMapper;
    }

    @PostConstruct
    public void validateQuestionPrompt() {
        if (!chatPromptResource.exists()) {
            log.error("chatPromptResource prompt resource not found: {}", chatPromptResource.getFilename());
        } else {
            log.info("chatPromptResource prompt: {}", chatPromptResource);
        }
    }


    public ChatDTO chat(ChatDTO chatDTO, String userId)  {
            String response = this.chatClient
                    .prompt()
                    .system(chatPromptResource)
                    .system(sp -> sp.param("user_query", chatDTO.getMessage()))
                    .user(chatDTO.getMessage())
                    .advisors(new SimpleLoggerAdvisor())
                    .call()
                    .content();
            log.info("Chat response: {}", response);
        try {
            return jacksonObjectMapper.readValue(response, ChatDTO.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
