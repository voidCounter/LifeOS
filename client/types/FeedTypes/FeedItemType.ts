import {FeedItemAdditionOptionType} from "@/config/FeedItemAdditionConfig";

export interface FeedItemType {
    itemId: string;
    title: string;
    description: string;
    url: string;
    itemType: FeedItemAdditionOptionType;
    categories: string[];
    estimatedDurationMinutes: number,
    createdAt: string;
    updatedAt: string;
    thumbnail: string;
}