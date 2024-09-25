package org.lifeos.ai.dto.pathway;

import lombok.Data;

@Data
public class TaskGenerationDTO {
    private String title;
    private String description;
    private String context;
    private String stageId;
}
