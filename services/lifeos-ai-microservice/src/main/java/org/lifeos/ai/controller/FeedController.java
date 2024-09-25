package org.lifeos.ai.controller;

import org.lifeos.ai.service.FeedService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FeedController {
    private final FeedService helperService;

    public FeedController(FeedService helperService) {
        this.helperService = helperService;
    }

    @PostMapping("/summary")
    public String getSummary(@RequestBody String content) {
        return helperService.getSummary(content);
    }

    @PostMapping("/insights")
    public String getInsights(@RequestBody String content) {
        return helperService.getInsights(content);
    }
}
