package org.lifeos.pathway.controller;

import lombok.RequiredArgsConstructor;
import org.lifeos.pathway.dto.*;
import org.lifeos.pathway.model.Roadmap;
import org.lifeos.pathway.model.Stage;
import org.lifeos.pathway.model.StageType;
import org.lifeos.pathway.service.PathwayService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class PathwayController {

    private static final Logger log = LoggerFactory.getLogger(PathwayController.class);

    private final PathwayService pathwayService;


    @PostMapping(value = "/generate-questions", produces = "application/json")
    public ResponseEntity<?> generateStageWithPrompt(
            @RequestBody StageCreationDTO stageCreationDTO,
            @RequestHeader(value = "UserId", required = false) String userId
    ) {
        try {
            log.info("Generating stage with prompt: {}", stageCreationDTO);
            List<Question> generatedQuestion =
                    pathwayService
                            .generateQuestion(stageCreationDTO);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(
                            generatedQuestion
                    );
        } catch (Exception e) {
            log.error("Error generating stage with prompt: {}", stageCreationDTO.getPrompt(), e);
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(
                            e.getMessage() + "\n failed to generate stage with prompt: " + stageCreationDTO.getPrompt()
                    );
        }
    }




    @PostMapping(value = "/generate-substages", produces = "application/json")
    public ResponseEntity<?> generateSubStagePrompt(
            @RequestBody SubStageGenerationDTO subStageGenerationDTO,
            @RequestHeader (value = "user-id") String userId
    ) {
        try {
            log.info("Request: {}", subStageGenerationDTO);
            List<Stage> generatedRoadmap =
                    pathwayService
                            .generateSubStageByPrompt(subStageGenerationDTO, userId);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(
                        generatedRoadmap
                    );
        } catch (Exception e) {
            log.error("Error generating roadmap: ", e);
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(
                        e.getMessage() + "\n failed to generate roadmap"
                    );
        }
    }

    @PostMapping(value = "/generate-task", produces = "application/json")
    public ResponseEntity<?> generateTask(
            @RequestBody TaskGenerationDTO taskGenerationDTO,
            @RequestHeader (value = "user-id") String userId
    ) {
        try {
            log.info("Request: {}", taskGenerationDTO);
            String generatedTask =
                    pathwayService
                            .generateTask(taskGenerationDTO, userId);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(
                        generatedTask
                    );
        } catch (Exception e) {
            log.error("Error generating task: ", e);
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(
                        e.getMessage() + "\n failed to generate task"
                    );
        }
    }

    @PostMapping(value="/get")
    public ResponseEntity<?> getStageById(
            @RequestBody SubStageGenerationDTO subStageGenerationDTO,
            @RequestHeader (value = "user-id", required = false) String userId
    ) {
        try {
            Stage stage = pathwayService.getStageById(
                    subStageGenerationDTO,
                    userId
            );
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(
                        stage
                    );
        } catch (Exception e) {
            log.error("Error getting stage by id: ", e);
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(
                        e.getMessage() + "\n failed to get stage by id: "
                    );
        }
    }

    @PostMapping(value= "/generate-substage-by-name", produces = "application/json")
    public ResponseEntity<?> generateSubStageByName(
            @RequestBody SubStageGenerationDTO subStageGenerationDTO,
            @RequestHeader (value = "user-id") String userId
    ) {
        try {
            List<Stage> subStages = pathwayService.generateSubStageByName(subStageGenerationDTO, userId);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(
                            subStages
                    );
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(
                            e.getMessage() + "\n failed to generate substage by name"
                    );
        }
    }

}
