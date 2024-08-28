package org.lifeos.ai.dto;

import lombok.Data;

@Data
public class StageRequestDTO {
    private String topic;
    private String stageType;
    private String constraints;
    private String noOfSubStages;
    private String language;
}
