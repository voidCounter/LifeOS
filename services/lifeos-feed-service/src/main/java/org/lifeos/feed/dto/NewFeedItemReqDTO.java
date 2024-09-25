package org.lifeos.feed.dto;

import lombok.Data;
import org.lifeos.feed.model.FeedItemType;

@Data
public class NewFeedItemReqDTO {
    private FeedItemType itemType;
    private String url;
}
