package org.lifeos.pathway.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

import java.util.List;

@Data
public class GeneratedStage {
    private String stageType;
    private String title;
    private JsonNode description;
    private List<GeneratedStage> subStages;
}
