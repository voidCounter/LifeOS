package org.lifeos.pathway.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.lifeos.pathway.model.StageType;

import java.sql.Timestamp;
import java.util.UUID;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StageResponseDTO {
    private String stageId;
    private String title;
    private String description;
    private String type;
    private Boolean status;
    private Timestamp createdAt;
    private Timestamp dueDate;
    private UserResponseDTO creator;
    private String parentId;
    private List<StageResponseDTO> subStages;


}


