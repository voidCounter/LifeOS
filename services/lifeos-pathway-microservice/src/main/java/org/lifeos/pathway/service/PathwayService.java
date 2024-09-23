package org.lifeos.pathway.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.lifeos.pathway.dto.*;
import org.lifeos.pathway.model.Roadmap;
import org.lifeos.pathway.model.Stage;
import org.lifeos.pathway.model.StageType;
import org.lifeos.pathway.model.User;
import org.lifeos.pathway.repository.RoadmapRepository;
import org.lifeos.pathway.repository.StageRepository;
import org.lifeos.pathway.repository.UserRepository;
import org.lifeos.pathway.service_client.AiServiceClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class PathwayService {

    private static final Logger log = LoggerFactory.getLogger(PathwayService.class);

    private final StageRepository stageRepository;
    private final UserRepository userRepository;
    private final AiServiceClient aiServiceClient;
    private final ObjectMapper jacksonObjectMapper;
    private final RoadmapRepository roadmapRepository;

    public PathwayService(
            StageRepository stageRepository,
            UserRepository userRepository,
            AiServiceClient aiServiceClient,
            ObjectMapper jacksonObjectMapper,
            RoadmapRepository roadmapRepository
    ) {
        this.stageRepository = stageRepository;
        this.userRepository = userRepository;
        this.aiServiceClient = aiServiceClient;
        this.jacksonObjectMapper = jacksonObjectMapper;
        this.roadmapRepository = roadmapRepository;
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



    @Transactional
    public List<Stage> saveSubStages(List<SubStageGeneratedResponseDTO> subStageGeneratedResponseDTOS, String userId, String parentId) {
        Stage parentStage;
        if (parentId != null) {
            parentStage = stageRepository.findById(UUID.fromString(parentId))
                    .orElseThrow(() -> new RuntimeException("Parent not found"));
        } else {
            parentStage = null;
        }

        List <Stage> stages =  subStageGeneratedResponseDTOS.stream().map(subStageGeneratedResponseDTO -> {
            Stage stage = new Stage();
            stage.setType(StageType.fromValue(subStageGeneratedResponseDTO.getStageType().toUpperCase()));
            stage.setStatus(false);
            if (StageType.fromValue(subStageGeneratedResponseDTO.getStageType().toUpperCase()) == StageType.ROADMAP) {
                User creator = userRepository.findById(UUID.fromString(userId))
                        .orElseThrow(() -> new RuntimeException("User not found"));
                log.info("Creator: {}", creator);
                stage = new Roadmap(creator, true);
            }
            stage.setParent(parentStage);
            stage.setTitle(subStageGeneratedResponseDTO.getTitle());
            stage.setDescription(subStageGeneratedResponseDTO.getDescription());
            log.info("stage: {}", stage.getTitle());
            return stage;
        }).toList();
        return stageRepository.saveAll(stages);
    }

    @Transactional
    public List<Stage> generateSubStageByPrompt(SubStageGenerationDTO subStageGenerationDTO, String userId) {
        log.info("Generating substage with prompt: {}", subStageGenerationDTO.getContext());
        String generatedRoadmap = aiServiceClient.generateSubStagePrompt(subStageGenerationDTO);
        log.info("Generated Roadmap: {}", generatedRoadmap);
        try {
            List<SubStageGeneratedResponseDTO> generatedSubStages =
                    jacksonObjectMapper.readValue(generatedRoadmap, new TypeReference<List<SubStageGeneratedResponseDTO>>() {});

            log.info("Generated SubStages: {}", generatedSubStages);

            return saveSubStages(
                    generatedSubStages,
                    userId,
                    subStageGenerationDTO.getParentId()
            );
        } catch (Exception e) {
            throw new RuntimeException("Error parsing stage Data", e);
        }
    }

    public String generateTask(TaskGenerationDTO taskGenerationDTO, String userId) {
        log.info("Generating task with title: {}", taskGenerationDTO.getTitle());
        String generatedTask = aiServiceClient.generateTask(taskGenerationDTO);
        log.info("Generated Task: {}", generatedTask);
        return generatedTask;

    }

    @Transactional
    public Stage getStageById(SubStageGenerationDTO subStageGenerationDTO, String userId) {
        Stage stage = stageRepository.findById(UUID.fromString(subStageGenerationDTO.getParentId()))
                .orElseThrow(() -> new RuntimeException("Stage not found"));

        if (stage.getSubStages() == null || stage.getSubStages().isEmpty()) {
            stage.setSubStages(generateSubStageByPrompt(subStageGenerationDTO, userId));
        }
        return stage;
    }
}
