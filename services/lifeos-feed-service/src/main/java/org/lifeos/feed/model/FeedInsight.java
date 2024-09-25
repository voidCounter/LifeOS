package org.lifeos.feed.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.UUID;

@Entity
@Table(name = "feed_item_insights")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FeedInsight {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID insightId;

    @ManyToOne
    @JoinColumn(name = "feed_item_id")
    @JsonBackReference
    @ToString.Exclude
    private FeedItem feedItem;


    private String title;
    private String content;
}
