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
    private Long noOfTotalStage;
    private Long noOfCompletedStage;

    public Long countTotalStages() {
        long count = 1; // Count this stage
        if (subStages != null) {
            for (StageResponseDTO subStage : subStages) {
                count += subStage.countTotalStages(); // Recursively count sub-stages
            }
        }
        return count;
    }
    public Long countCompletedStages() {
        long count = status != null && status ? 1 : 0; // Count this stage if completed
        if (subStages != null) {
            for (StageResponseDTO subStage : subStages) {
                count += subStage.countCompletedStages(); // Recursively count completed sub-stages
            }
        }
        return count;
    }
}


