package org.lifeos.ai.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class FeedService {
    private static final Logger log = LoggerFactory.getLogger(FeedService.class);
    private final ChatClient summaryClient;
    private final ChatClient helperClient;
    private final ChatClient insightClient;

    public FeedService(@Qualifier("summaryClient") ChatClient summaryClient, @Qualifier("helperClient") ChatClient helperClient, @Qualifier("insightClient") ChatClient insightClient) {
        this.summaryClient = summaryClient;
        this.helperClient = helperClient;
        this.insightClient = insightClient;
    }

    public String getSummary(String content) {
        log.info("the given contnet: {}", content);
        return summaryClient.prompt()
                .advisors(new SimpleLoggerAdvisor())
                .system(sp -> sp.param("content", content)).user("Generate " +
                        "summary").call().content();
    }

    public String getInsights(String content) {
        return insightClient.prompt().system(sp -> sp.param("content", content)).user("Generate insights").call().content();
    }
}
