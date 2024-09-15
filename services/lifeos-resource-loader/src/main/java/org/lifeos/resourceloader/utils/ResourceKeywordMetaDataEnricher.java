package org.lifeos.resourceloader.utils;

import org.springframework.ai.document.Document;
import org.springframework.ai.transformer.KeywordMetadataEnricher;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ResourceKeywordMetaDataEnricher {
    private final VertexAiGeminiChatModel vertexAiGeminiChatModel;

    public ResourceKeywordMetaDataEnricher(VertexAiGeminiChatModel vertexAiGeminiChatModel) {
        this.vertexAiGeminiChatModel = vertexAiGeminiChatModel;
    }

    List<Document> enrichDocuments(List<Document> documents) {
        KeywordMetadataEnricher enricher = new KeywordMetadataEnricher(vertexAiGeminiChatModel, 5);
        return enricher.apply(documents);
    }
}
