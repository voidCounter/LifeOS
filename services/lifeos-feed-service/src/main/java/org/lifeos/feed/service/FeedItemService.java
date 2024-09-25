package org.lifeos.feed.service;

import org.lifeos.feed.dto.ArticleFeedItemDTO;
import org.lifeos.feed.dto.FeedItemDTO;
import org.lifeos.feed.dto.NewFeedItemReqDTO;
import org.lifeos.feed.dto.UserDTO;
import org.lifeos.feed.model.ArticleFeedItem;
import org.lifeos.feed.model.FeedItem;
import org.lifeos.feed.model.FeedItemType;
import org.lifeos.feed.model.User;
import org.lifeos.feed.repository.FeedItemRepository;
import org.lifeos.feed.repository.UserRepository;
import org.lifeos.feed.service_clients.ResourceLoaderClient;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

import static java.util.stream.Collectors.toList;

@Service
public class FeedItemService {
    private static final Logger log = LoggerFactory.getLogger(FeedItemService.class);
    private final ResourceLoaderClient resourceLoaderClient;
    private final FeedItemRepository feedItemRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    public FeedItemService(ResourceLoaderClient resourceLoaderClient,
                           FeedItemRepository feedItemRepository,
                           ModelMapper modelMapper, UserRepository userRepository) {
        this.resourceLoaderClient = resourceLoaderClient;
        this.feedItemRepository = feedItemRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
    }

    public void addFeedItem(String userId,
                            NewFeedItemReqDTO newFeedItemReqDTO) {
        User user =
                userRepository.findById(UUID.fromString(userId)).orElseThrow(() -> new RuntimeException("No user found"));
        FeedItem feedItem = null;
        if (newFeedItemReqDTO.getItemType() == FeedItemType.ARTICLE) {
            ArticleFeedItemDTO articleFeedItemDTO =
                    resourceLoaderClient.parseArticle(newFeedItemReqDTO.getUrl());
            feedItem = ArticleFeedItem.builder().build();
            feedItem = modelMapper.map(articleFeedItemDTO,
                    ArticleFeedItem.class);
            feedItem.setItemType(FeedItemType.ARTICLE);

            // estimate duration to read
            int words = articleFeedItemDTO.getContent().split(" ").length;
            feedItem.setEstimatedDurationMinutes(words / 200);
        } else if (newFeedItemReqDTO.getItemType() == FeedItemType.YOUTUBE) {
//            return "Youtube video added";
        } else {
//            return "Unknown item type";
        }

        if (feedItem != null) {
            feedItem.setUser(user);
            feedItemRepository.save(feedItem);
        } else {
            throw new RuntimeException("Feed item not added");
        }
    }

    public List<FeedItemDTO> getFeed(String userId) {
        User user =
                userRepository.findById(UUID.fromString(userId)).orElseThrow(() -> new RuntimeException("No user found"));
        List<FeedItem> feedItems = feedItemRepository.findAllByUser(user);
        return feedItems.stream().map(feedItem -> {
            FeedItemDTO feedItemDTO = null;
            if (feedItem.getItemType() == FeedItemType.ARTICLE) {
                log.info("it's an article: {}", feedItem);
                feedItemDTO = modelMapper.map(modelMapper.map(feedItem,
                        ArticleFeedItem.class), ArticleFeedItemDTO.class);
                feedItemDTO.setUser(modelMapper.map(user, UserDTO.class));
            } else {
                throw new UnsupportedOperationException("Unsupported " +
                        "FeedItemType");
            }
            return feedItemDTO;
        }).collect(toList());
    }

    public FeedItem getFeedItem(String feedItemId) {
        return feedItemRepository.findById(UUID.fromString(feedItemId)).orElseThrow(() -> new RuntimeException("No feed item found"));
    }

    public String getFeedContent(String feedItemId) {
        FeedItem feedItem =
                feedItemRepository.findById(UUID.fromString(feedItemId)).orElseThrow(() -> new RuntimeException("No feed item found"));
        if (feedItem.getItemType() == FeedItemType.ARTICLE) {
            return ((ArticleFeedItem) feedItem).getContent();
        } else {
            throw new UnsupportedOperationException("Unsupported FeedItemType");
        }
    }
}
