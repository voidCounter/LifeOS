package org.lifeos.feed.model;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@Entity
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@JsonTypeName("ARTICLE")
@Table(name = "article_feed_items")
public class ArticleFeedItem extends FeedItem {
    private String summary;
    private String content;
}
