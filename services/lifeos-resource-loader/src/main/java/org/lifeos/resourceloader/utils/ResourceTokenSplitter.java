package org.lifeos.resourceloader.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.document.Document;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ResourceTokenSplitter {
    private static final Logger log = LoggerFactory.getLogger(ResourceTokenSplitter.class);

    public List<Document> splitDocuments(List<Document> documents) {
        TokenTextSplitter splitter = new TokenTextSplitter(1000, 400, 10,
                5000, true);
        log.info("lets start chunking: {}", documents);
        return splitter.apply(documents);
    }
}
