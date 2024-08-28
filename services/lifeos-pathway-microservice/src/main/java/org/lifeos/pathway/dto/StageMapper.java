package org.lifeos.pathway.dto;

import org.lifeos.pathway.model.Roadmap;
import org.lifeos.pathway.model.Stage;

import java.util.stream.Collectors;

public class StageMapper {

    public static StageResponseDTO toStageResponseDTO(Stage stage) {
        StageResponseDTO dto = new StageResponseDTO();
        dto.setStageId(stage.getStageId());
        dto.setTitle(stage.getTitle());
        dto.setDescription(stage.getDescription());
        dto.setStageType(stage.getType());
        dto.setStatus(stage.getStatus());
        dto.setCreatedAt(stage.getCreatedAt());
        dto.setDueDate(stage.getDueDate());


        if (stage instanceof Roadmap roadmap) {
            UserResponseDTO creatorDto = new UserResponseDTO();
            creatorDto.setUserId(roadmap.getCreator().getUserId());
            creatorDto.setUsername(roadmap.getCreator().getUsername());
            dto.setCreator(creatorDto);
        }


        dto.setSubStages(
                stage.getSubStages().stream()
                        .map(StageMapper::toStageResponseDTO)
                        .collect(Collectors.toList())
        );

        return dto;
    }
}
