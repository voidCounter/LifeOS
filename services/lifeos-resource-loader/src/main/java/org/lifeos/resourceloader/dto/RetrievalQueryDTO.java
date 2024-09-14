package org.lifeos.resourceloader.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class RetrievalQueryDTO {
    private String fileName;
    private String query;
}
