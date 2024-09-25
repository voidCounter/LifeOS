package org.lifeos.feed.dto;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@JsonTypeName("ARTICLE")
public class ArticleFeedItemDTO extends FeedItemDTO {
    private String content;
    private String summary;
}
