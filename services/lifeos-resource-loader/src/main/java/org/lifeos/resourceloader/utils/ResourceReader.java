package org.lifeos.resourceloader.utils;

import org.springframework.ai.document.Document;
import org.springframework.ai.reader.TextReader;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.reader.tika.TikaDocumentReader;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;

@Component
public class ResourceReader {
    public List<Document> readText(Resource resource, String fileName,
                                   String sourceURL) {
        TextReader textReader = new TextReader(resource);
        textReader.getCustomMetadata().put("fileName", fileName);
        List<Document> documents = textReader.read();
        documents.forEach(doc -> doc.getMetadata().put("source", fileName));
        return documents;
    }

    public List<Document> readFile(Resource resource) {
        if (Objects.requireNonNull(resource.getFilename()).endsWith(".pdf")) {
            PagePdfDocumentReader pagePdfDocumentReader = new PagePdfDocumentReader(resource);
            return pagePdfDocumentReader.read();
        } else {
            TikaDocumentReader tikaDocumentReader = new TikaDocumentReader(resource);
            return tikaDocumentReader.read();
        }
    }
}
