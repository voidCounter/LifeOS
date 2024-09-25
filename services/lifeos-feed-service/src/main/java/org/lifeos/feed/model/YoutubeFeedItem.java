package org.lifeos.feed.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "youtube_feed_items")
public class YoutubeFeedItem extends FeedItem {
    private String transcript;
    private String summary;
}
