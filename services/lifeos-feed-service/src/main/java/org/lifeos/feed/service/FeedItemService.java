package org.lifeos.feed.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.lifeos.feed.dto.*;
import org.lifeos.feed.model.*;
import org.lifeos.feed.repository.FeedInsightRepository;
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
    private final AIClient aIClient;
    private final ObjectMapper jacksonObjectMapper;
    private final FeedInsightRepository feedInsightRepository;

    public FeedItemService(ResourceLoaderClient resourceLoaderClient,
                           FeedItemRepository feedItemRepository,
                           ModelMapper modelMapper, UserRepository userRepository, AIClient aIClient, ObjectMapper jacksonObjectMapper, FeedInsightRepository feedInsightRepository) {
        this.resourceLoaderClient = resourceLoaderClient;
        this.feedItemRepository = feedItemRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
        this.aIClient = aIClient;
        this.jacksonObjectMapper = jacksonObjectMapper;
        this.feedInsightRepository = feedInsightRepository;
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

    public String getFeedSummary(String feedItemId) {
        FeedItem feedItem =
                feedItemRepository.findById(UUID.fromString(feedItemId)).orElseThrow(() -> new RuntimeException("No feed item found"));
        if (feedItem.getItemType() == FeedItemType.ARTICLE) {
            String summary = ((ArticleFeedItem) feedItem).getSummary();
            if (summary == null || summary.isEmpty()) {
                // generate summary from content
                String feedSummary = "";
                try {
                    feedSummary =
                            aIClient.getSummary(((ArticleFeedItem) feedItem).getContent());
                } catch (Exception e) {
                    throw new RuntimeException("Error generating summary");
                }
                ((ArticleFeedItem) feedItem).setSummary(feedSummary);
                feedItemRepository.save(feedItem);
                return feedSummary;
            } else {
                return ((ArticleFeedItem) feedItem).getSummary();
            }
        } else {
            throw new UnsupportedOperationException("Unsupported FeedItemType");
        }
    }

    public List<FeedInsightDTO> getFeedInsights(String feedItemId) {
        FeedItem feedItem =
                feedItemRepository.findById(UUID.fromString(feedItemId)).orElseThrow(() -> new RuntimeException("No feed item found"));
        List<FeedInsight> feedInsights = feedItem.getInsights();
        log.info("FeedInsights: {}", feedInsights);
        if (feedInsights != null && !feedInsights.isEmpty()) {
            return feedInsights.stream().map(feedInsight -> modelMapper.map(feedInsight, FeedInsightDTO.class)).collect(toList());
        } else {
            String generatedInsights = aIClient.getInsights(getFeedSummary(feedItemId));
            log.info("Generated Insights: {}", generatedInsights);
            try {
                FeedInsightAIDTO generatedAIFeedInsights =
                        jacksonObjectMapper.readValue(generatedInsights,
                                FeedInsightAIDTO.class);
                // Generate FeedItemInsight from FeedInsightAIDTO
                List<FeedInsight> toBeSavedFeedInsights =
                        generatedAIFeedInsights.getInsights().stream().map(feedInsightDTO -> {
                            FeedInsight feedInsight = new FeedInsight();
                            feedInsight.setTitle(feedInsightDTO.getTitle());
                            feedInsight.setContent(feedInsightDTO.getContent());
                            feedInsight.setFeedItem(feedItem);
                            return feedInsight;
                        }).collect(toList());

                feedItem.setInsights(toBeSavedFeedInsights);
                feedItemRepository.save(feedItem);
                return feedItem.getInsights().stream().map(feedInsight -> modelMapper.map(feedInsight, FeedInsightDTO.class)).collect(toList());
            } catch (JsonProcessingException e) {
                throw new RuntimeException("Error parsing insights Data", e);
            }
        }
    }
}
