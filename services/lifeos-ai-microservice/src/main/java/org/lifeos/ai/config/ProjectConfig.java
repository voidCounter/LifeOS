package org.lifeos.ai.config;

import org.apache.logging.log4j.simple.SimpleLogger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.transformer.SummaryMetadataEnricher;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import java.util.List;

@Configuration
@ComponentScan(basePackages = {"org.lifeos.ai.config"})
public class ProjectConfig {
    private static final Logger log = LoggerFactory.getLogger(ProjectConfig.class);
    @Value("classpath:/prompts/PathwaySystemPrompt.st")
    private Resource pathwaySystemPromptResource;

    @Value("classpath:/prompts/QuizSystemPrompt.st")
    private Resource quizSystemPromptResource;

    @Value("classpath:/prompts/JSONSyntaxPrompt.st")
    private Resource jsonSyntaxPromptResource;

    @Value("classpath:/prompts/ShortAnswerQuestionCheckingPrompt.st")
    private Resource shortAnswerQuestionCheckingPromptResource;


    @Bean
    ChatClient quizClient(ChatClient.Builder builder) {
        return builder.defaultSystem(quizSystemPromptResource).build();
    }

    @Bean
    ChatClient helperClient(ChatClient.Builder builder) {
        return builder.defaultSystem(jsonSyntaxPromptResource).defaultUser(shortAnswerQuestionCheckingPromptResource).build();
    }

    @Bean
    ChatClient pathwayClient(ChatClient.Builder builder) {
        return builder.defaultSystem(pathwaySystemPromptResource).build();
    }


}
