package org.lifeos.resourceloader.controller;

import org.lifeos.resourceloader.service.WebArticleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
