package org.lifeos.feed.repository;

import org.lifeos.feed.model.FeedInsight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FeedInsightRepository extends JpaRepository<FeedInsight,
        UUID> {
}
