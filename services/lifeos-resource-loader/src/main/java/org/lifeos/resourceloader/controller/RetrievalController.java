package org.lifeos.resourceloader.controller;

import org.lifeos.resourceloader.dto.RetrievalQueryDTO;
import org.lifeos.resourceloader.service.RetrievalService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RetrievalController {
    private static final Logger log = LoggerFactory.getLogger(RetrievalController.class);
    private final RetrievalService retrievalService;

    public RetrievalController(RetrievalService retrievalService) {
        this.retrievalService = retrievalService;
    }

    @PostMapping("/retrieve")
    public String retrieve(@RequestBody RetrievalQueryDTO retrievalQueryDTO) {
        log.info("Retrieving chunks for query: {}", retrievalQueryDTO.getQuery());
        return retrievalService.retrieveChunks(retrievalQueryDTO);
    }
}
