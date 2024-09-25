package org.lifeos.ai.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.PromptChatMemoryAdvisor;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.InMemoryChatMemory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

@Configuration
@ComponentScan(basePackages = {"org.lifeos.ai.config"})
public class ProjectConfig {
    private static final Logger log = LoggerFactory.getLogger(ProjectConfig.class);
    @Value("classPath:/prompts/PathwaySystemPrompt.st")
    private Resource pathwaySystemPromptResource;

    @Value("classPath:/prompts/PathwayUserPrompt.st")
    private Resource pathwayUserPromptResource;

    @Value("classPath:/prompts/QuizSystemPrompt.st")
    private Resource quizSystemPromptResource;

    @Value("classPath:/prompts/JSONSyntaxPrompt.st")
    private Resource jsonSyntaxPromptResource;

    @Value("classpath:/prompts/ShortAnswerQuestionCheckingPrompt.st")
    private Resource shortAnswerQuestionCheckingPromptResource;

    @Value("classpath:/prompts/SummarySystemPrompt.st")
    private Resource summarySystemPromptResource;

    @Value("classpath:/prompts/HelperclientPrompt.st")
    private Resource helperClientPrompt;

    @Value("classpath:/prompts/InsightGenerationPrompt.st")
    private Resource insightGenerationPrompt;


    @Bean
    ChatClient summaryClient(ChatClient.Builder builder) {
        return builder.defaultSystem(summarySystemPromptResource).build();
    }

    @Bean
    ChatClient insightClient(ChatClient.Builder builder) {
        return builder.defaultSystem(insightGenerationPrompt).build();
    }

    @Bean
    ChatClient helperClient(ChatClient.Builder builder) {
        return builder.defaultSystem(helperClientPrompt).build();
    }

    @Bean
    ChatClient quizClient(ChatClient.Builder builder) {
        return builder.defaultSystem(quizSystemPromptResource).defaultUser(jsonSyntaxPromptResource).build();
    }

    @Bean
    ChatMemory chatMemory() {
        return new InMemoryChatMemory();
    }

    @Bean
    ChatClient shortAnswerEvaluatorClient(ChatClient.Builder builder) {
        return builder.defaultSystem(jsonSyntaxPromptResource).defaultUser(shortAnswerQuestionCheckingPromptResource).build();
    }

    @Bean
    ChatClient pathwayClient(ChatClient.Builder builder, ChatMemory chatMemory) {
        return builder
//                .defaultSystem(pathwaySystemPromptResource)
//                .defaultUser(pathwayUserPromptResource)
                .defaultAdvisors(
                        new PromptChatMemoryAdvisor(chatMemory)
                )
                .build();
    }

    @Bean
    ChatClient subStageGenerationClient(ChatClient.Builder builder) {
        return builder
                .defaultAdvisors(
                        new SimpleLoggerAdvisor()
                )
                .build();
    }

}
