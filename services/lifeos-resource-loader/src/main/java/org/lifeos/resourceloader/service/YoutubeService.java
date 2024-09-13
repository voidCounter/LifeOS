package org.lifeos.resourceloader.service;

import io.github.thoroldvix.api.TranscriptContent;
import io.github.thoroldvix.api.TranscriptRetrievalException;
import io.github.thoroldvix.api.YoutubeTranscriptApi;
import org.lifeos.resourceloader.utils.ResourceReader;
import org.lifeos.resourceloader.utils.ResourceTokenSplitter;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class YoutubeService {
    private final YoutubeTranscriptApi youtubeTranscriptApi;
    private final ResourceReader resourceReader;
    private final ResourceTokenSplitter resourceTokenSplitter;
    private final VectorStore vectorStore;

    public YoutubeService(YoutubeTranscriptApi youtubeTranscriptApi,
                          ResourceReader resourceReader,
                          ResourceTokenSplitter resourceTokenSplitter, VectorStore vectorStore) {
        this.youtubeTranscriptApi = youtubeTranscriptApi;
        this.resourceReader = resourceReader;
        this.resourceTokenSplitter = resourceTokenSplitter;
        this.vectorStore = vectorStore;
    }

    public String extractVideoId(String youtubeURL) {
        // https://youtu.be/VIDEO_ID
        // https://www.youtube.com/watch?v=VIDEO_ID
        if (youtubeURL.contains("youtu.be/")) {
            return youtubeURL.substring(youtubeURL.lastIndexOf('/') + 1).split("\\?")[0];
        } else if (youtubeURL.contains("youtube.com/watch?v=")) {
            return youtubeURL.substring(youtubeURL.lastIndexOf("v=") + 2).split("&")[0];
        }
        return null;
    }

    public String getTranscript(String videoId) {
        String transcript;
        try {
            TranscriptContent transcriptContent
                    = youtubeTranscriptApi.getTranscript(videoId,
                    "en");
            transcript =
                    transcriptContent.getContent().stream().map(TranscriptContent.Fragment::getText).collect(java.util.stream.Collectors.joining(" "));
        } catch (TranscriptRetrievalException e) {
            throw new RuntimeException("Error parsing youtube video.");
        }
        return transcript;
    }

    public void loadTranscript(String youtubeURL) {
        String videoID = extractVideoId(youtubeURL);
        String transcript = getTranscript(videoID);
        Resource resource = new ByteArrayResource(transcript.getBytes());
        // load
        List<Document> loadedText = resourceReader.loadText(resource,
                "Youtube-" + videoID + ".txt", youtubeURL);
        // split into chunks
        List<Document> splitTexts =
                resourceTokenSplitter.splitDocuments(loadedText);
        // adding to vector store
        vectorStore.add(splitTexts);
    }
}
