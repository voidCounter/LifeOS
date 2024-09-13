package org.lifeos.resourceloader.controller;

import org.lifeos.resourceloader.service.YoutubeService;
import org.lifeos.resourceloader.utils.ResourceReader;
import org.lifeos.resourceloader.utils.ResourceTokenSplitter;
import org.springframework.ai.document.Document;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class YoutubeController {
    private final YoutubeService youtubeService;


    public YoutubeController(YoutubeService youtubeService) {
        this.youtubeService = youtubeService;

    }

    @PostMapping("/loadYoutubeTranscript/{youtubeURL}")
    public ResponseEntity<String> loadTranscript(@PathVariable String youtubeURL) {
        youtubeService.loadTranscript(youtubeURL);
        return ResponseEntity.ok("Transcript loaded successfully");
    }
}
