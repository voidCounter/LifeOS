package org.lifeos.pathway.service;

import lombok.RequiredArgsConstructor;
import org.lifeos.pathway.controller.StageController;
import org.lifeos.pathway.dto.*;
import org.lifeos.pathway.model.Roadmap;
import org.lifeos.pathway.model.Stage;
import org.lifeos.pathway.model.StageType;
import org.lifeos.pathway.model.User;
import org.lifeos.pathway.repository.StageRepository;
import org.lifeos.pathway.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StageService {

    private static final Logger log = LoggerFactory.getLogger(StageService.class);

    private final StageRepository stageRepository;
    private final UserRepository userRepository;

    private Stage isPresentStageId(UUID stageId) {
        Optional<Stage> stage = stageRepository.findById(stageId);
//        log.info("Fetching stage with ID: {}", stageId);
        if (stage.isPresent()) {
//            log.info("Found stage: {}", stage.get().getStageId());
            return stage.get();
        } else {
            throw new RuntimeException("Stage with id " + stageId + " not found");
        }
    }



    @Transactional
    public void addStage(StageDTO stageDTO) {
        Stage stage = new Stage(stageDTO);
        if (StageType.fromValue(stageDTO.getType().toUpperCase()) != StageType.ROADMAP) {
            Stage parentStage = isPresentStageId(stageDTO.getParentId());
            stage.setParent(parentStage);
        } else {
            User creator =
                    userRepository.findById(stageDTO.getCreatorId()).
                            orElseThrow(() -> new RuntimeException("User not found"));
            stage = new Roadmap(creator, stageDTO.getPublished());

            stage.setStatus(stageDTO.getStatus());
            stage.setType(StageType.fromValue(stageDTO.getType()));
            stage.setDueDate(stageDTO.getDueDate());
            stage.setDescription(stageDTO.getDescription());
            stage.setTitle(stageDTO.getTitle());
            stage.setParent(null);
        }
        stageRepository.save(stage);
    }

    public StageResponseDTO getStage(UUID stageId) {
         return StageMapper.toStageResponseDTO(
                 isPresentStageId(stageId)
         ); 
    }

    public void deleteStage(StageDeleteDTO stageDeleteDTO) {
        stageRepository.delete(
                isPresentStageId(
                        stageDeleteDTO.getStageId()
                )
        );
    }

    public void updateStage(StageUpdateDTO stageUpdateDTO) {

        if (stageUpdateDTO.getPublished()) {

        }
    }
}
