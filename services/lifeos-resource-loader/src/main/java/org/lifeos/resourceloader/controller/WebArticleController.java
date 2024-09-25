package org.lifeos.resourceloader.controller;

import org.lifeos.resourceloader.dto.ArticleFeedItemDTO;
import org.lifeos.resourceloader.service.WebArticleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/web-article")
public class WebArticleController {
    private static final Logger log = LoggerFactory.getLogger(WebArticleController.class);
    private final WebArticleService webArticleService;

    public WebArticleController(WebArticleService webArticleService) {
        this.webArticleService = webArticleService;
    }

    @PostMapping("/loadWebArticle")
    public ResponseEntity<String> loadWebArticle(@RequestBody String articleURL) {
        String content = webArticleService.loadArticle(articleURL);
        log.info("Article loaded from URL: {}", content);
        return ResponseEntity.ok(content);
    }

    @PostMapping("/parse-article")
    public ArticleFeedItemDTO parseArticle(@RequestBody String articleURL) {
        return webArticleService.parseArticle(articleURL);
    }
}
