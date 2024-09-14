package org.lifeos.resourceloader.config;

import io.github.thoroldvix.api.YoutubeTranscriptApi;
import io.github.thoroldvix.internal.TranscriptApiFactory;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.transformer.SummaryMetadataEnricher;
import org.springframework.ai.vertexai.embedding.text.VertexAiTextEmbeddingModel;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ProjectConfig {

    @Bean
    public YoutubeTranscriptApi youtubeTranscriptApi() {
        return TranscriptApiFactory.createDefault();
    }

    @Bean
    public SummaryMetadataEnricher summaryMetadataEnricher(VertexAiGeminiChatModel vertexAiGeminiChatModel) {
        return new SummaryMetadataEnricher(vertexAiGeminiChatModel,
                List.of(SummaryMetadataEnricher.SummaryType.PREVIOUS,
                        SummaryMetadataEnricher.SummaryType.CURRENT,
                        SummaryMetadataEnricher.SummaryType.NEXT));
    }

//    @Bean
//    public EmbeddingModel embeddingModel() {
//        return new VertexAiTextEmbeddingModel();
//    }
}
