package org.lifeos.resourceloader.utils;

import org.springframework.ai.document.Document;
import org.springframework.ai.transformer.SummaryMetadataEnricher;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ResourceSummaryMetaDataEnricher {
    private final SummaryMetadataEnricher summaryMetadataEnricher;

    public ResourceSummaryMetaDataEnricher(SummaryMetadataEnricher summaryMetadataEnricher) {
        this.summaryMetadataEnricher = summaryMetadataEnricher;
    }

    List<Document> enrichDocuments(List<Document> documents) {
        return summaryMetadataEnricher.apply(documents);
    }
}
