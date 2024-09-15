package org.lifeos.resourceloader.service;

import org.apache.pdfbox.Loader;
import org.lifeos.resourceloader.utils.ResourceReader;
import org.lifeos.resourceloader.utils.ResourceTokenSplitter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoaderService {
    private static final Logger log = LoggerFactory.getLogger(LoaderService.class);
    private final ResourceReader resourceReader;
    private final VectorStore vectorStore;
    private final ResourceTokenSplitter resourceTokenSplitter;

    public LoaderService(ResourceReader resourceReader, VectorStore vectorStore, ResourceTokenSplitter resourceTokenSplitter) {
        this.resourceReader = resourceReader;
        this.vectorStore = vectorStore;
        this.resourceTokenSplitter = resourceTokenSplitter;
    }

    public void loadText(Resource resource, String fileName, String source) {
        // TODO: resource from same source should be loaded only once
        List<Document> loaded =
                vectorStore.similaritySearch(SearchRequest.query("source").withTopK(1).withFilterExpression("fileName == '" + fileName + "'"));
        if (!loaded.isEmpty()) {
            log.info("File already loaded: {}", fileName);
            return;
        }
        // load
        List<Document> loadedText = resourceReader.loadText(resource,
                fileName, source);
        // split into chunks
        List<Document> splitTexts =
                resourceTokenSplitter.splitDocuments(loadedText);
        // adding to vector store
        vectorStore.accept(splitTexts);
    }
}
