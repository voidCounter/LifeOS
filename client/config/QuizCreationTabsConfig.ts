import {
    LucideIcon,
    MousePointerIcon, MousePointerSquareDashed,
    NewspaperIcon,
    NotebookIcon, SquareMousePointer,
    TextIcon,
    Video
} from "lucide-react";

export type QuizCreationOptionType =
    "prompt"
    | "article"
    | "youtube"
    | "note"

export interface QuizCreationTabConfig {
    tabIcon: LucideIcon,
    tabName: QuizCreationOptionType,
    onClick: () => void,
}


export const quizCreationOptions: QuizCreationTabConfig[] = [
    {
        tabIcon: TextIcon,
        tabName: "prompt",
        onClick: () => {
        }
    },
    {
        tabIcon: NewspaperIcon,
        tabName: "article",
        onClick: () => {
        }
    },
    {
        tabIcon: Video,
        tabName: "youtube",
        onClick: () => {
        }
    },
    {
        tabIcon: NotebookIcon,
        tabName: "note",
        onClick: () => {
        }
    },

];
