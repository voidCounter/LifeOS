import {LucideIcon, NewspaperIcon, Video} from "lucide-react";

export type FeedItemAdditionOptionType =
    | "article"
    | "youtube"

export interface FeedItemAdditionTabConfig {
    tabIcon: LucideIcon,
    tabName: FeedItemAdditionOptionType,
}


export const feedItemAdditionOption: FeedItemAdditionTabConfig[] = [
    {
        tabIcon: NewspaperIcon,
        tabName: "article",
    },
    {
        tabIcon: Video,
        tabName: "youtube",
    },
];
