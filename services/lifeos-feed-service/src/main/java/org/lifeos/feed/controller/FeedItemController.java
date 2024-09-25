package org.lifeos.feed.controller;

import org.lifeos.feed.dto.NewFeedItemReqDTO;
import org.lifeos.feed.model.FeedItem;
import org.lifeos.feed.service.FeedItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class FeedItemController {
    private final FeedItemService feedItemService;

    public FeedItemController(FeedItemService feedItemService) {
        this.feedItemService = feedItemService;
    }

    @GetMapping("/{feedItemId}")
    public ResponseEntity<?> getFeedItem(@PathVariable String feedItemId) {
        FeedItem feedItem = feedItemService.getFeedItem(feedItemId);
        return ResponseEntity.ok(feedItem);
    }

    @GetMapping("/{feedItemId}/content")
    public ResponseEntity<?> getFeedContent(@PathVariable String feedItemId) {
        return ResponseEntity.ok(feedItemService.getFeedContent(feedItemId));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addFeedItem(@RequestHeader(name = "user-id",
            required = false) String userId,
                                         @RequestBody NewFeedItemReqDTO newFeedItemReqDTO) {
        feedItemService.addFeedItem(userId, newFeedItemReqDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Feed item added");
    }

    @GetMapping("/getFeed")
    public ResponseEntity<?> getFeed(@RequestParam(name = "user", required
            = true) String userId) {
        return ResponseEntity.ok(feedItemService.getFeed(userId));
    }
}
