package org.lifeos.resourceloader.service;

import org.lifeos.resourceloader.dto.RetrievalQueryDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.ai.vectorstore.filter.Filter;
import org.springframework.ai.vectorstore.filter.FilterExpressionBuilder;
import org.springframework.expression.Expression;
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
                retrievalQueryDTO.getQuery() + " ---- into ----" + retrievalQueryDTO.getFileNames());

        // filter expression
        FilterExpressionBuilder filterExpressionBuilder =
                new FilterExpressionBuilder();
        log.info("Filter expression builder: {}",
                retrievalQueryDTO.getFileNames().toString());
        Filter.Expression filterByFilenames = filterExpressionBuilder.in(
                "source", retrievalQueryDTO.getFileNames().toString()).build();
//        log.info("Filter expression: {}", filterByFilenames.toString());
        String filterByFilenamesString =
                "source in [" + retrievalQueryDTO.getFileNames().stream().map(s -> "'" + s + "'").collect(Collectors.joining(", ")) + "]";

        log.info("Filter by filenames string: {}", filterByFilenamesString);
        List<Document> matchedDocs =
                vectorStore.similaritySearch(SearchRequest.query(retrievalQueryDTO.getQuery().isEmpty() ? "Retrieve" : retrievalQueryDTO.getQuery()).withTopK(3).withFilterExpression(filterByFilenamesString));

        log.info("Matched docs: {}", matchedDocs);
        return matchedDocs.stream().map(Document::getContent).collect(Collectors.joining("\n"));
    }
}
