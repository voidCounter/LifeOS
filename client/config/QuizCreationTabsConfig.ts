import {
    LucideIcon,
    MousePointerIcon, MousePointerSquareDashed,
    NewspaperIcon,
    NotebookIcon, SquareMousePointer,
    TextIcon,
    Video
} from "lucide-react";

export type QuizCreationOptionType = "Prompt" | "Article" | "Youtube" | "Note" | "Manual";
export interface QuizCreationTabConfig {
    tabIcon: LucideIcon,
    tabName: QuizCreationOptionType,
    onClick: () => void,
}


export const quizCreationOptions: QuizCreationTabConfig[] = [
    {
        tabIcon: TextIcon,
        tabName: "Prompt",
        onClick: () => {
        }
    },
    {
        tabIcon: NewspaperIcon,
        tabName: "Article",
        onClick: () => {
        }
    },
    {
        tabIcon: Video,
        tabName: "Youtube",
        onClick: () => {
        }
    },
    {
        tabIcon: NotebookIcon,
        tabName: "Note",
        onClick: () => {
        }
    },
    {
        tabIcon: SquareMousePointer,
        tabName: "Manual",
        onClick: () => {
        }
    }
];
