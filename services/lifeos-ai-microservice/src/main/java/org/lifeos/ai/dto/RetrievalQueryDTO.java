package org.lifeos.ai.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class RetrievalQueryDTO {
    private String fileName;
    private String query;
}
