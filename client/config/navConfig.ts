import {
    LightbulbIcon, ListTodoIcon, LucideIcon,
    NewspaperIcon,
    NotebookIcon,
    RouteIcon, SparkleIcon
} from "lucide-react";
import {NavConfigType} from "@/types/NavTypes";


export const navConfig: NavConfigType = {
    navItems: [
        {
            label: "Quizzes",
            icon: LightbulbIcon,
            path: "/app/quizzes",
            subItems: [
                {
                    label: "Explore",
                    path: "/app/quizzes/explore",
                },
                {
                    label: "Library",
                    path: "/app/quizzes/library",
                }
            ]
        },
        {
            label: "Pathways",
            icon: RouteIcon,
            path: "/app/pathways",
            subItems: [
                {
                    label: "Explore",
                    path: "/app/pathways/explore",
                },
                {
                    label: "Library",
                    path: "/app/pathways/library",
                }
            ]
        },
        {
            label: "Task Manager",
            path: "/app/taskmanager",
            icon: ListTodoIcon,
        },
        {
            label: "Journal",
            path: "/app/journal",
            icon: NotebookIcon
        },
        {
            label: "Feed",
            icon: NewspaperIcon,
            path: "/app/feed",
            subItems: [
                {
                    label: "Explore",
                    path: "/app/feed/explore"
                },
                {
                    label: "Library",
                    path: "/app/feed/library"
                }
            ]
        },
        {
            label: "Thinkpad",
            path: "/app/thinkpad",
            icon: SparkleIcon,
        }
    ]
}

export default navConfig;
