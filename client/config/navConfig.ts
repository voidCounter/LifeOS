import {
    LightbulbIcon, ListTodoIcon, LucideIcon,
    NewspaperIcon,
    NotebookIcon,
    RouteIcon, SparkleIcon
} from "lucide-react";
import {NavConfigType} from "@/types/NavTypes";


export const navConfig:NavConfigType= {
    navItems: [
        {
            label: "Quizzes",
            icon: LightbulbIcon,
            path: "/quizzes",
            subItems: [
                {
                    label: "Explore",
                    path: "/quizzes/explore",
                },
                {
                    label: "Library",
                    path: "/quizzes/library",
                }
            ]
        },
        {
            label: "Pathways",
            icon: RouteIcon,
            path: "/pathways",
            subItems: [
                {
                    label: "Explore",
                    path: "/pathways/explore",
                },
                {
                    label: "Library",
                    path: "/pathways/library",
                }
            ]
        },
        {
            label: "Task Manager",
            path: "/taskmanager",
            icon: ListTodoIcon,
        },
        {
            label: "Journal",
            path: "/journal",
            icon: NotebookIcon
        },
        {
            label: "Feed",
            icon: NewspaperIcon,
            path: "/feed",
            subItems: [
                {
                    label: "Explore",
                    path: "/feed/explore"
                },
                {
                    label: "Library",
                    path: "/feed/library"
                }
            ]
        },
        {
            label: "Thinkpad",
            path: "/thinkpad",
            icon: SparkleIcon,
        }
    ]
}

export default navConfig;
