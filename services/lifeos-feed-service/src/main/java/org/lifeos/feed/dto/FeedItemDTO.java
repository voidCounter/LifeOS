package org.lifeos.feed.dto;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.*;
import org.lifeos.feed.model.FeedItemType;

import java.util.List;

@JsonTypeInfo(use = JsonTypeInfo.Id.DEDUCTION, property =
        "itemType")
@JsonSubTypes({
        @JsonSubTypes.Type(value = ArticleFeedItemDTO.class, name = "ARTICLE"),
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedItemDTO {
    private String itemId;
    private String title;
    private String description;
    private String itemType;
    private String url;
    private List<CategoryDTO> categories;
    private UserDTO user;
    private List<FeedInsightDTO> insights;
    private String createdAt;
    private String estimatedDurationMinutes;
    private String thumbnail;
    private String updatedAt;
}
