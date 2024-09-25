package org.lifeos.feed.service_clients;

import org.lifeos.feed.dto.ArticleFeedItemDTO;
import org.lifeos.feed.model.ArticleFeedItem;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "lifeos-resource-loader")
public interface ResourceLoaderClient {
    @PostMapping("/youtube/loadYoutubeTranscript")
    ResponseEntity<String> loadYoutubeTranscript(@RequestBody String youtubeURL);

    @PostMapping("/web-article/loadWebArticle")
    ResponseEntity<String> loadWebArticle(@RequestBody String articleURL);

    @PostMapping("/web-article/parse-article")
    ArticleFeedItemDTO parseArticle(@RequestBody String articleURL);
}
