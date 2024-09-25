package org.lifeos.resourceloader.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArticleFeedItemDTO {
    private String title;
    private String description;
    private String url;
    private String content;
    private String summary;
    private String thumbnail;
    private String estimatedReadingTime;
}
