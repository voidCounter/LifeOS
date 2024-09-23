package org.lifeos.ai.dto.pathway;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubStageGenerationDTO {
    private String context;
    private String language;
    private String type;
    private String parentId;
}
