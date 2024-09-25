package org.lifeos.feed.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "lifeos-AI-microservice")
public interface AIClient {
    @PostMapping("/summary")
    String getSummary(@RequestBody String content);

    @PostMapping("/insights")
    String getInsights(@RequestBody String content);
}
