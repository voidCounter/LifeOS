package org.lifeos.feed.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.lifeos.feed.dto.ArticleFeedItemDTO;
import org.lifeos.feed.dto.FeedItemDTO;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "feed_items")
@Inheritance(strategy = InheritanceType.JOINED)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "itemType")
@JsonSubTypes({
        @JsonSubTypes.Type(value = ArticleFeedItem.class, name = "ARTICLE"),
        @JsonSubTypes.Type(value = YoutubeFeedItem.class, name = "YOUTUBE"),
})
public class FeedItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID itemId;

    private String url;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private FeedItemType itemType;

    private Integer estimatedDurationMinutes;

    @ManyToMany
    @JoinTable(
            name = "feed_item_categories",
            joinColumns = @JoinColumn(name = "feed_item_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    @JsonManagedReference
    private List<Category> categories;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    private User user;

    private String thumbnail;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "feedItem", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<FeedInsight> insights;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;
}