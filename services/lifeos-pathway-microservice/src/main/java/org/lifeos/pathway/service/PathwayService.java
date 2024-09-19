package org.lifeos.pathway.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.lifeos.pathway.dto.*;
import org.lifeos.pathway.model.Roadmap;
import org.lifeos.pathway.model.Stage;
import org.lifeos.pathway.model.StageType;
import org.lifeos.pathway.model.User;
import org.lifeos.pathway.repository.StageRepository;
import org.lifeos.pathway.repository.UserRepository;
import org.lifeos.pathway.service_client.AiServiceClient;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PathwayService {

    private static final Logger log = LoggerFactory.getLogger(PathwayService.class);

    private final StageRepository stageRepository;
    private final UserRepository userRepository;
    private final AiServiceClient aiServiceClient;
    private final ObjectMapper jacksonObjectMapper;

    public PathwayService(
            StageRepository stageRepository,
            UserRepository userRepository,
            AiServiceClient aiServiceClient,
            ObjectMapper jacksonObjectMapper,
            ModelMapper modelMapper
    ) {
        this.stageRepository = stageRepository;
        this.userRepository = userRepository;
        this.aiServiceClient = aiServiceClient;
        this.jacksonObjectMapper = jacksonObjectMapper;
    }

    private Stage isPresentStageId(UUID stageId) {
        Optional<Stage> stage = stageRepository.findById(stageId);
        if (stage.isPresent()) {
            return stage.get();
        } else {
            throw new RuntimeException("Stage with id " + stageId + " not found");
        }
    }



    @Transactional
    public Stage addStage(StageDTO stageDTO) {
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
        return stageRepository.save(stage);
    }

    public StageResponseDTO getStage(UUID stageId) {
         return convertToStageResponseDTO(isPresentStageId(stageId));

    }

    public void deleteStage(StageDeleteDTO stageDeleteDTO) {
        stageRepository.delete(
                isPresentStageId(
                        stageDeleteDTO.getStageId()
                )
        );
    }

    public List<Question> generateQuestion(StageCreationDTO stageCreationDTO) {
        log.info("Generating question with prompt: {}", stageCreationDTO.getPrompt());
        String generatedQuestions = aiServiceClient.generatePathwayQuestions(stageCreationDTO);
        ObjectMapper objectMapper = new ObjectMapper();
        log.info("Generated questions: {}", generatedQuestions);
        try {
            return objectMapper.readValue(generatedQuestions, new TypeReference<List<Question>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Error parsing stage Data", e);
        }
    }

    public StageDTO convertToStageDTO(GeneratedStage generatedStage, String userId, UUID parentId) {
        StageDTO stageDTO = new StageDTO();
        stageDTO.setType(generatedStage.getStageType());
        stageDTO.setTitle(generatedStage.getTitle());
        stageDTO.setCreatorId(UUID.fromString(userId));
        stageDTO.setParentId(parentId);

        if (generatedStage.getDescription() != null) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                String descriptionString = objectMapper.writeValueAsString(generatedStage.getDescription());
                stageDTO.setDescription(descriptionString);
            } catch (JsonProcessingException e) {
                log.error("Error converting description to string", e);
                stageDTO.setDescription(null);
            }
        }

        stageDTO.setStatus(true);
        stageDTO.setDueDate(null);

        return stageDTO;
    }


    @Transactional
    public String saveStages(GeneratedStage stages, String userId, UUID parentId) {
        StageDTO stage = convertToStageDTO(stages, userId, parentId);
        Stage newStage = addStage(stage);

        if (stages.getSubStages() != null) {
            stages.getSubStages().forEach(subStage -> {
                saveStages(subStage, userId, newStage.getStageId());
            });
        }

        return newStage.getStageId().toString();
    }

    @Transactional
    public String generatePathwaysByPrompt(
            StageCreationDTO stageCreationDTO,
            String userId
    ) {
        log.info("Generating stage with prompt: {}", stageCreationDTO.getPrompt());
        String generatedStage = aiServiceClient.generatePathwayByPrompt(stageCreationDTO);
        log.info("Generated Stage: {}", generatedStage);
        try {
            GeneratedStage stages = jacksonObjectMapper.readValue(generatedStage, GeneratedStage.class);
            String roamapId = saveStages(stages, userId, null);
            log.info("Saved stage with id: {}", roamapId);
            return roamapId;
        } catch (Exception e) {
            throw new RuntimeException("Error parsing stage Data", e);
        }
    }

    public StageResponseDTO convertToStageResponseDTO(Stage stage) {
        if (stage == null) {
            return null;
        }

        StageResponseDTO stageDTO = new StageResponseDTO();
        stageDTO.setType(stage.getType() != null ? stage.getType().name() : null);
        stageDTO.setStatus(stage.getStatus());
        stageDTO.setDueDate(stage.getDueDate());
        stageDTO.setTitle(stage.getTitle());
        stageDTO.setDescription(stage.getDescription());
        stageDTO.setStageId(stage.getStageId().toString());
        stageDTO.setParentId(stage.getParent() != null ? stage.getParent().getStageId().toString() : null);
        stageDTO.setSubStages(
                stage.getSubStages().stream().map(this::convertToStageResponseDTO).collect(Collectors.toList())
        );
        return stageDTO;
    }

    @Transactional
    public StageResponseDTO getStagesById(String stageId) {
        Stage stage = stageRepository.findById(UUID.fromString(stageId))
                .orElseThrow(() -> new RuntimeException("Stage not found"));
        return convertToStageResponseDTO(stage);
    }
}
