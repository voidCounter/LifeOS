package org.lifeos.pathway.dto;

import lombok.Data;

import java.util.Date;

@Data
public class SimpleStageDTO {
    private String stageId;
    private String title;
    private Boolean isPublished;
    private Date createdAt;
}
