package org.lifeos.pathway.dto;

import lombok.Getter;
import lombok.Setter;
import org.lifeos.pathway.model.StageType;

import java.util.UUID;

@Getter
@Setter
public class StageDeleteDTO {
    private UUID stageId;
    private StageType type;
    private String title;
    private String description;
    private String createdAt;
}
