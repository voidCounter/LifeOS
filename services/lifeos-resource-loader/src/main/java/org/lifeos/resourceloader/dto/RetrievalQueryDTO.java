package org.lifeos.resourceloader.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class RetrievalQueryDTO {
    private List<String> fileNames;
    private String query;
}
