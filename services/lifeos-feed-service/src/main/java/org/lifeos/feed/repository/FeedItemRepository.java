package org.lifeos.feed.repository;

import org.lifeos.feed.dto.FeedItemDTO;
import org.lifeos.feed.model.FeedItem;
import org.lifeos.feed.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface FeedItemRepository extends JpaRepository<FeedItem, UUID> {
    List<FeedItem> findAllByUser(User user);
}
