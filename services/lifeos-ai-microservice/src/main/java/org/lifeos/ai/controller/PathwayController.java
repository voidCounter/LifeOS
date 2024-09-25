package org.lifeos.ai.controller;

import lombok.RequiredArgsConstructor;
import org.lifeos.ai.dto.StageRequestDTO;
import org.lifeos.ai.dto.pathway.SubStageGenerationDTO;
import org.lifeos.ai.dto.pathway.TaskGenerationDTO;
import org.lifeos.ai.service.PathwayService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class PathwayController {

    private static final Logger log = LoggerFactory.getLogger(PathwayController.class);
    private final PathwayService pathwayService;

    @PostMapping(value = "/generate-questions", produces = "application/json")
    public ResponseEntity<String> generatePathwayQuestions(
            @RequestBody StageRequestDTO stageRequestDTO,
            @RequestHeader(value = "UserId", required = false) String userId
    ) {
        log.info("Requested by: {}", userId);
        log.info("Request: {}", stageRequestDTO);
             String generatedQuestions =
                        pathwayService
                                .generatePathwayQuestions(stageRequestDTO);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(generatedQuestions);
    }



    @PostMapping(value = "/generate-substages", produces = "application/json")
    public ResponseEntity<String> generateSubStagePrompt(
            @RequestBody SubStageGenerationDTO subStageGenerationDTO
            ) {
        log.info("Request: {}", subStageGenerationDTO);
        String generatedRoadmap =
                pathwayService
                        .generateSubStageByPrompt(subStageGenerationDTO);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(generatedRoadmap);
    }

    @PostMapping(value = "/generate-task", produces = "application/json")
    public ResponseEntity<String> generateTask(
            @RequestBody TaskGenerationDTO taskGenerationDTO
            ) {
        log.info("Request: {}", taskGenerationDTO);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(pathwayService.generateTask(taskGenerationDTO));
    }

    @PostMapping(value = "/generate-stage-by-name", produces = "application/json")
    public ResponseEntity<String> generateStageByName(
            @RequestBody SubStageGenerationDTO subStageGenerationDTO
            ) {
        log.info("Request: {}", subStageGenerationDTO);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(pathwayService.generateSubStageByName(subStageGenerationDTO));
    }

}
