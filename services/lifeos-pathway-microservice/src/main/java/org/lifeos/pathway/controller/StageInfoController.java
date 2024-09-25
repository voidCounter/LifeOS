package org.lifeos.pathway.controller;

import lombok.RequiredArgsConstructor;
import org.lifeos.pathway.dto.PublishDTO;
import org.lifeos.pathway.dto.SimpleStageDTO;
import org.lifeos.pathway.dto.SubStageCountDTO;
import org.lifeos.pathway.dto.SubStageGenerationDTO;
import org.lifeos.pathway.model.Roadmap;
import org.lifeos.pathway.service.StageInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class StageInfoController {

    private static final Logger log = LoggerFactory.getLogger(StageInfoService.class);


    private final StageInfoService stageInfoService;

    @GetMapping(value = "/no-of-substage/{stageId}", produces = "application/json")
    public ResponseEntity<?> getSubStageSizeIfExists(
            @PathVariable String stageId,
            @RequestHeader (value = "user-id") String userId
    ) {
        try {
            SubStageCountDTO subStageCountDTO = stageInfoService.getSubStageSizeIfExists(stageId, userId);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(
                            subStageCountDTO
                    );
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(
                            e.getMessage() + "\n failed to generate stage with prompt: " + stageId
                    );
        }
    }

    @PutMapping(value = "/toggle-publish/{stageId}/{value}", produces = "application/json")
    public ResponseEntity<?> togglePublic(
            @PathVariable String stageId,
            @PathVariable Boolean value,
            @RequestHeader (value = "user-id") String userId
    ) {
        try {
            log.info("Toggling public stage with id: {}", stageId);
            log.info("Toggling public stage with value: {}", value);
            stageInfoService.togglePublic(stageId, userId, value);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(void.class);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(
                            e.getMessage() + "\n failed to toggle public stage: " + stageId
                    );
        }
    }

    @GetMapping(value = "/publish-status/{stageId}", produces = "application/json")
    public ResponseEntity<?> getPublishedRoadmap(
            @PathVariable String stageId,
            @RequestHeader (value = "user-id") String userId
    ) {
        try {
             PublishDTO publishDTO = stageInfoService.getPublishedRoadmaps(stageId, userId);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(
                            publishDTO
                    );
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(
                            e.getMessage() + "\n failed to get published roadmaps"
                    );
        }
    }

    @GetMapping(value="/get-by-user", produces = "application/json")
    public ResponseEntity<List<SimpleStageDTO>> getStageByUserId(
            @RequestHeader (value = "user-id") String userId
    ) {
        List<SimpleStageDTO> stages = stageInfoService.getStageById(
                userId
        );
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        stages
                );

    }

}
