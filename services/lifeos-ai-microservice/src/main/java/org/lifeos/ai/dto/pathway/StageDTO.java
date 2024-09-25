package org.lifeos.ai.dto.pathway;

import lombok.Data;

import java.sql.Timestamp;
import java.util.UUID;

@Data
public class StageDTO {
    private String type;
    private Boolean status;
    private Timestamp dueDate;
    private String title;
    private String description;
    private UUID parentId;
    private UUID creatorId;
    private Boolean published;
}
