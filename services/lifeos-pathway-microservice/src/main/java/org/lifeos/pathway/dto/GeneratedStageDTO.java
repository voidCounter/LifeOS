package org.lifeos.pathway.dto;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import org.lifeos.pathway.model.StageType;

import java.util.List;

@Data
public class GeneratedStageDTO{
    private StageType stageType;
    private String title;
    private JsonNode description;
    private List<GeneratedStageDTO> subStages;
}
