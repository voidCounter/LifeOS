package org.lifeos.resourceloader.controller;

import org.lifeos.resourceloader.service.EmbeddingService;
import org.springframework.ai.embedding.Embedding;
import org.springframework.ai.embedding.EmbeddingOptionsBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class EmbeddingController {
    private final EmbeddingService embeddingService;

    public EmbeddingController(EmbeddingService embeddingService) {
        this.embeddingService = embeddingService;
    }

    @GetMapping("/getEmbedding")
    public float[] getEmbedding(@RequestParam String text) {
        return embeddingService.getEmbedding(text);
    }
}
