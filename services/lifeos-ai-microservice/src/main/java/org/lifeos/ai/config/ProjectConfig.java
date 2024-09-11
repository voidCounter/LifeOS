package org.lifeos.ai.config;

import org.apache.logging.log4j.simple.SimpleLogger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

@Configuration
public class ProjectConfig {
    private static final Logger log = LoggerFactory.getLogger(ProjectConfig.class);
    @Value("classPath:/prompts/PathwaySystemPrompt.st")
    private Resource pathwaySystemPromptResource;

    @Value("classPath:/prompts/QuizSystemPrompt.st")
    private Resource quizSystemPromptResource;


    @Bean
    ChatClient quizClient(ChatClient.Builder builder) {
        return builder.defaultSystem(quizSystemPromptResource).build();
    }

    @Bean
    ChatClient pathwayClient(ChatClient.Builder builder) {
        return builder.defaultSystem(pathwaySystemPromptResource).build();
    }


}
