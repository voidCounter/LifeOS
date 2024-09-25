package org.lifeos.pathway.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lifeos.pathway.controller.PathwayController;
import org.lifeos.pathway.dto.PublishDTO;
import org.lifeos.pathway.dto.SimpleStageDTO;
import org.lifeos.pathway.dto.SubStageCountDTO;
import org.lifeos.pathway.model.Roadmap;
import org.lifeos.pathway.model.Stage;
import org.lifeos.pathway.model.User;
import org.lifeos.pathway.repository.RoadmapRepository;
import org.lifeos.pathway.repository.StageRepository;
import org.lifeos.pathway.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.ErrorResponseException;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StageInfoService {

    private static final Logger log = LoggerFactory.getLogger(StageInfoService.class);

    private final StageRepository stageRepository;
    private final RoadmapRepository roadmapRepository;
    private final UserRepository userRepository;

    private Boolean checkIfStageIsPublic(String stageId, String userId) {
        Stage stage = stageRepository.findById(UUID.fromString(stageId))
                .orElseThrow(() -> new IllegalArgumentException("Stage not found"));

        while (stage.getParent() != null) {
            stage = stage.getParent(); // Move to parent stage
        }
        stage = roadmapRepository.findById(stage.getStageId())
                .orElseThrow(() -> new IllegalArgumentException("Root stage not found"));

        if (stage != null) {
            Roadmap roadmap = (Roadmap) stage;
            if (roadmap.getCreator().getUserId().equals(UUID.fromString(userId))) {
                return true;
            }
            return roadmap.getPublished();
        }

        throw new IllegalArgumentException("Root stage is not a Roadmap");

    }

    public SubStageCountDTO getSubStageSizeIfExists(String stageId, String userId) {
        Stage stage = stageRepository.findById(UUID.fromString(stageId))
                .orElseThrow(() -> new IllegalArgumentException("Stage not found"));
        Boolean isStageIsPublic = checkIfStageIsPublic(stageId, userId);
        log.info("Stage is public: {}", isStageIsPublic);
        if (isStageIsPublic) {
            Number noOfStages = stage.getSubStages() == null || stage.getSubStages().isEmpty() ? null : stage.getSubStages().size();
            SubStageCountDTO subStageCountDTO = new SubStageCountDTO();
            subStageCountDTO.setNoOfSubStages(noOfStages);
            return subStageCountDTO;
        }
        throw new ErrorResponseException(HttpStatus.LOCKED);
    }

    public void togglePublic(String stageId, String userId, Boolean value) {
        Roadmap roadmap = roadmapRepository.findById(UUID.fromString(stageId))
                .orElseThrow(() -> new IllegalArgumentException("Roadmap not found"));

        if (roadmap.getCreator().getUserId().equals(UUID.fromString(userId))) {
            roadmap.setPublished(value);
            roadmapRepository.save(roadmap);
        } else {
            throw new ErrorResponseException(HttpStatus.UNAUTHORIZED);
        }
    }

    public PublishDTO getPublishedRoadmaps(String StageId, String userId) {
        Roadmap roadmap = roadmapRepository.findById(UUID.fromString(StageId))
                .orElseThrow(() -> new IllegalArgumentException("Roadmap not found"));

        if (roadmap.getCreator().getUserId().equals(UUID.fromString(userId))) {
            PublishDTO publishDTO = new PublishDTO();
            publishDTO.setIsPublished(roadmap.getPublished());
            return publishDTO;
        } else {
            throw new ErrorResponseException(HttpStatus.UNAUTHORIZED);
        }
    }

    public List<SimpleStageDTO> getStageById(String userId) {

        List<Roadmap> roadmaps = roadmapRepository.findByCreator_UserId(UUID.fromString(userId));
        return roadmaps.stream().map(roadmap -> {
            SimpleStageDTO simpleStageDTO = new SimpleStageDTO();
            simpleStageDTO.setStageId(roadmap.getStageId().toString());
            simpleStageDTO.setTitle(roadmap.getTitle());
            simpleStageDTO.setIsPublished(roadmap.getPublished());
            simpleStageDTO.setCreatedAt(roadmap.getCreatedAt());
            return simpleStageDTO;
        }).toList();

    }
}
