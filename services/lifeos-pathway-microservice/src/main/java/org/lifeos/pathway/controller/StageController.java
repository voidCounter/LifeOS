package org.lifeos.pathway.controller;

import lombok.RequiredArgsConstructor;
import org.lifeos.pathway.dto.*;
import org.lifeos.pathway.model.StageType;
import org.lifeos.pathway.service.StageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class StageController {

    private static final Logger log = LoggerFactory.getLogger(StageController.class);

    private final StageService stageService;

    @GetMapping("/{stageid}")
    public ResponseEntity<?> getStage(@PathVariable UUID stageid) {
        try {
            log.info("Get stage with id {}", stageid);
            StageResponseDTO stageResponse = stageService.getStage(stageid);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(
                        stageResponse
                    );
        } catch (Exception e) {
            log.error("Error getting stage with id {}", stageid, e);
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(
                            e.getMessage()
                    );
        }
    }


    @PostMapping
//    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> addStage(@RequestBody StageDTO stageDTO) {
        try {
            log.info("Adding stage {}", stageDTO);
            stageService.addStage(stageDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(
                            StageType.fromValue(stageDTO.getType()) + " added successfully"
                    );
        } catch (Exception e) {
            log.error("Error adding stage {}", stageDTO, e);
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(
                            e.getMessage() + "\n failed adding type" + StageType.fromValue(stageDTO.getType())
                    );
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteStage(@RequestBody StageDeleteDTO stageDeleteDTO) {
        try {
            log.info("Deleting stage {}", stageDeleteDTO);
            stageService.deleteStage(stageDeleteDTO);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(
                            "Stage with stage id " + stageDeleteDTO.getStageId() + " deleted successfully"
                    );
        } catch (Exception e) {
            log.error("Error deleting stage {}", stageDeleteDTO, e);
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(
                            e.getMessage() + "\n failed to delete stage with id "+ stageDeleteDTO.getStageId()
                    );
        }
    }

    @PostMapping(value = "/generate-questions", produces = "application/json")
    public ResponseEntity<?> generateStageWithPrompt(
            @RequestBody StageCreationDTO stageCreationDTO,
            @RequestHeader(value = "UserId", required = false) String userId
    ) {
        try {
            log.info("Generating stage with prompt: {}", stageCreationDTO);
            List<Question> generatedQuestion =
                    stageService
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
}
