package org.lifeos.resourceloader.utils;

import org.springframework.ai.document.Document;
import org.springframework.ai.reader.TextReader;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ResourceReader {
    public List<Document> loadText(Resource resource, String fileName,
                                   String sourceURL) {
        TextReader textReader = new TextReader(resource);
        textReader.getCustomMetadata().put("fileName", fileName);
        textReader.getCustomMetadata().put("source", sourceURL);
        List<Document> documents = textReader.read();
        documents.forEach(doc -> doc.getMetadata().put("source", sourceURL));
        return documents;
    }
}
