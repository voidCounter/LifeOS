package org.lifeos.feed.model;

public enum FeedItemType {
    YOUTUBE,
    ARTICLE;

    public String getValue(FeedItemType feedItemType) {
        return feedItemType.toString();
    }
}
