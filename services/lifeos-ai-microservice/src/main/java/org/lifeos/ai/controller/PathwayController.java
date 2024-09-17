package org.lifeos.ai.controller;

import lombok.RequiredArgsConstructor;
import org.lifeos.ai.dto.StageRequestDTO;
import org.lifeos.ai.dto.pathway.Question;
import org.lifeos.ai.dto.pathway.QuestionDTO;
import org.lifeos.ai.service.PathwayService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PathwayController {

    private static final Logger log = LoggerFactory.getLogger(PathwayController.class);
    private final PathwayService pathwayService;

    @PostMapping(value = "/generate-pathway-by-prompt", produces = "application/json")
    public ResponseEntity<List<Question>> generatePathwayByPrompt(
            @RequestBody StageRequestDTO stageRequestDTO,
            @RequestHeader(value = "UserId", required = false) String userId
    ) {
        log.info("Requested by: {}", userId);
        log.info("Request: {}", stageRequestDTO);
        List<Question> generatedQuestions =
                        pathwayService
                                .generateQuestions(stageRequestDTO);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(generatedQuestions);
    }
}
