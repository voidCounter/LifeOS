"use client";
import NavItemCard, {NavItemCardProps} from "@/components/NavItemCard";
import {
    ListCheckIcon,
    ListTodoIcon,
    NewspaperIcon,
    NotebookPenIcon,
    RouteIcon
} from "lucide-react";


const navItems: NavItemCardProps[] = [
    {
        title: "Quiz",
        subTitle: "Learn and test your knwoledge",
        icon: ListCheckIcon,
        href: "/app/quizzes/explore"
    },
    {
        title: "Pathways",
        subTitle: "Generate pathways and adjust according to your needs",
        icon: RouteIcon,
        href: "/app/pathways/explore"
    },
    {
        title: "Feed",
        subTitle: "Save any article or video from the internet.",
        icon: NewspaperIcon,
        href: "/app/feed/explore"
    },
    {
        title: "Journal",
        subTitle: "Do bullet journaling and get personalized insights.",
        icon: NotebookPenIcon,
        href: "/app/journal"
    },
    {
        title: "Task manager",
        subTitle: "Track your daily tasks and learning.",
        icon: ListTodoIcon,
        href: "/app/taskmanager"
    }
]

export default function app() {
    return (
        <main
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-12 gap-4">
            {
                navItems.map((item, index) => <NavItemCard key={index}
                                                           className={"bg-zinc-50"}
                                                           title={item.title}
                                                           subTitle={item.subTitle}
                                                           icon={item.icon}
                                                           href={item.href}></NavItemCard>)
            }
        </main>
    );
}
