package org.lifeos.pathway.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class StageUpdateDTO {
    private UUID stageId;
    private String title;
    private String description;
    private String dueDate;
    private Boolean status;
    private Boolean published;
}
