package org.lifeos.resourceloader.service;

import com.vladsch.flexmark.html2md.converter.FlexmarkHtmlConverter;
import net.dankito.readability4j.Article;
import net.dankito.readability4j.Readability4J;
import net.dankito.readability4j.extended.Readability4JExtended;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.lifeos.resourceloader.dto.ArticleFeedItemDTO;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class WebArticleService {
    private final LoaderService loaderService;

    public WebArticleService(LoaderService loaderService) {
        this.loaderService = loaderService;
    }

    private String getThumbnail(String parsedContentinHTML) {
        Document document = Jsoup.parse(parsedContentinHTML);
        Element firstImageElem = document.select("img").first();
        if (firstImageElem != null) {
            return firstImageElem.attr("src");
        }
        return "";
    }

    private Article extractArticle(String url) {
        try {
            Document document = Jsoup.connect(url).get();
            Readability4J readability4J = new Readability4JExtended(url, document);
            return readability4J.parse();
        } catch (IOException e) {
            throw new RuntimeException("Error while extracting article from " +
                    "url: " + url);
        }
    }

    private String convertHTMLToMarkdown(String html) {
        FlexmarkHtmlConverter parser = FlexmarkHtmlConverter.builder().build();
        return parser.convert(html);
    }

    // TODO: Have an exception handling mechanism like @ControllerAdvice
    public String loadArticle(String url) {
        Resource articleResource;
        try {
            String articleInMDN =
                    convertHTMLToMarkdown(extractArticle(url).getContentWithUtf8Encoding());
            articleResource = new ByteArrayResource(articleInMDN.getBytes());
        } catch (Exception e) {
            throw new RuntimeException("Error while fetching the article from" +
                    " " +
                    "url: " + url);
        }
        String fileName;
        try {
            fileName = "article" + url.hashCode() + ".md";
            loaderService.loadText(articleResource,
                    fileName, "https://serpapi.com/blog/web-scraping-and-parsing" +
                            "-experiment-with-ai-openai/");
        } catch (Exception e) {
            throw new RuntimeException("Error while loading the article from " +
                    "url: " + url);
        }
        return fileName;
    }

    public ArticleFeedItemDTO parseArticle(String articleURL) {
        Article parsedArticle = extractArticle(articleURL);
        String thumbnail = getThumbnail(parsedArticle.getContentWithUtf8Encoding());
        return ArticleFeedItemDTO.builder().title(parsedArticle.getTitle())
                .description(parsedArticle.getExcerpt())
                .url(articleURL)
                .thumbnail(thumbnail)
                .content(convertHTMLToMarkdown(parsedArticle.getContentWithUtf8Encoding()))
                .build();
    }
}
