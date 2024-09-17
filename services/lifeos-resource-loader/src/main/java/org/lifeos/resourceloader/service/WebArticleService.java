package org.lifeos.resourceloader.service;

import com.vladsch.flexmark.html2md.converter.FlexmarkHtmlConverter;
import net.dankito.readability4j.Article;
import net.dankito.readability4j.Readability4J;
import net.dankito.readability4j.extended.Readability4JExtended;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class WebArticleService {
    private LoaderService loaderService;

    public WebArticleService(LoaderService loaderService) {
        this.loaderService = loaderService;
    }

    private String extractArticle(String url) {
        try {
            Document document = Jsoup.connect(url).get();
            Readability4J readability4J = new Readability4JExtended(url, document);
            Article article = readability4J.parse();
            return article.getContentWithUtf8Encoding();
        } catch (IOException e) {
            throw new RuntimeException("Error while extracting article from " +
                    "url: " + url);
        }
    }

    private String convertHTMLToMarkdown(String html) {
        FlexmarkHtmlConverter parser = FlexmarkHtmlConverter.builder().build();
        return parser.convert(html);
    }

    public String loadArticle(String url) {
        String articleInMDN = convertHTMLToMarkdown(extractArticle(url));
        Resource articleResource = new ByteArrayResource(articleInMDN.getBytes());
        String fileName = "article" + url.hashCode() + ".md";
        loaderService.loadText(articleResource,
                "article-" + url.hashCode() + ".md", "https://serpapi.com/blog/web-scraping-and-parsing-experiment-with-ai-openai/");
        return fileName;
    }
}
