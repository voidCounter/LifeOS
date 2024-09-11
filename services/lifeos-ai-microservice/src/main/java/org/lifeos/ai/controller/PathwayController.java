//package org.lifeos.ai.controller;
//
//import lombok.RequiredArgsConstructor;
//import org.lifeos.ai.dto.StageRequestDTO;
//import org.lifeos.ai.service.PathwayService;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.Objects;
//
//@RestController
//@RequiredArgsConstructor
//public class PathwayController {
//
//    private final PathwayService pathwayService;
//
//    @GetMapping("/generate-stage")
//    public ResponseEntity<String> generateStages(
//            @RequestBody StageRequestDTO stageRequestDTO
//    ) {
//        String generatedStages = String.join(
//                "", Objects.requireNonNull(
//                        pathwayService
//                                .generateStages(stageRequestDTO)
//                                .collectList()
//                                .block()
//                )
//        );
//        return ResponseEntity
//                .status(HttpStatus.OK)
//                .body(generatedStages);
//    }
//}
