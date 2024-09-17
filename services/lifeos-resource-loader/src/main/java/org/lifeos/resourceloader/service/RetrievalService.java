package org.lifeos.resourceloader.service;

import org.lifeos.resourceloader.dto.RetrievalQueryDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RetrievalService {
    private static final Logger log = LoggerFactory.getLogger(RetrievalService.class);
    private final VectorStore vectorStore;

    public RetrievalService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    public String retrieveChunks(RetrievalQueryDTO retrievalQueryDTO) {
        log.info("Doing similarity search: {}",
                retrievalQueryDTO.getQuery() + " ---- into ----" + retrievalQueryDTO.getFileName());
        List<Document> matchedDocs =
                vectorStore.similaritySearch(SearchRequest.query(retrievalQueryDTO.getQuery()).withTopK(3).withFilterExpression("fileName == '" + retrievalQueryDTO.getFileName() + "'"));
        return matchedDocs.stream().map(Document::getContent).collect(Collectors.joining("\n"));
    }
}
