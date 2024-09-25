import {
    LightbulbIcon,
    ListTodoIcon,
    LucideIcon,
    NewspaperIcon, TextIcon,
    Video
} from "lucide-react";

export type FeedItemViewOptionTypes =
    | "Content"
    | "Summary"
    | "Insights"

export interface FeedItemAdditionTabConfig {
    tabIcon: LucideIcon,
    tabName: FeedItemViewOptionTypes,
}


export const feedItemViewOptions: FeedItemAdditionTabConfig[] = [
    {
        tabIcon: TextIcon,
        tabName: "Content",
    },
    {
        tabIcon: ListTodoIcon,
        tabName: "Summary",
    },
    {
        tabIcon: LightbulbIcon,
        tabName: "Insights",
    }
];
