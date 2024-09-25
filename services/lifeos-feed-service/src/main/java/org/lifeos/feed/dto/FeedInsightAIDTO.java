package org.lifeos.feed.dto;

import lombok.Data;
import org.lifeos.feed.model.FeedInsight;

import java.util.List;

@Data
public class FeedInsightAIDTO {
    private List<FeedInsightDTO> insights;
}
