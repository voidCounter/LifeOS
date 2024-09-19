"use client"
import React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {quizCreationOptions} from "@/config/QuizCreationTabsConfig";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {useQuizCreationStore} from "@/store/QuizCreationStore";
import {Space} from "lucide-react";

interface QuizCreationLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export default function QuizCreationLayout({className, children}:
                                               QuizCreationLayoutProps
) {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <div
            className={`${cn(className)} w-full h-screen overflow-y-scroll px-2 no-scrollbar`}>
            <Tabs
                value={pathname.split("/").pop()}
                className="w-full flex flex-col items-center"
            >
                <TabsList
                    className={`w-full  grid sticky top-0 z-50 h-fit rounded-xl`}
                    style={{gridTemplateColumns: `repeat(${quizCreationOptions.length}, minmax(0, 1fr))`}}
                >
                    {
                        quizCreationOptions.map((creationOption, index) =>
                            <TabsTrigger key={index}
                                         value={creationOption.tabName.toLowerCase()}
                                         className={"rounded-lg"}
                            >
                                <Link
                                    href={`/app/quizzes/create/${creationOption.tabName.toLowerCase()}`}
                                    className={"w-full h-full"}>
                                    <div className={"rounded-lg flex flex-col" +
                                        " gap-2" +
                                        " justify-center items-center"}>
                                        <creationOption.tabIcon strokeWidth={1}
                                                                className={"w-6" +
                                                                    " h-6"}/>
                                        {creationOption.tabName.charAt(0).toUpperCase() + creationOption.tabName.slice(1)}
                                    </div>
                                </Link>
                            </TabsTrigger>
                        )
                    }
                </TabsList>
                {
                    quizCreationOptions.map((creationOption, index) =>
                        <TabsContent
                            value={creationOption.tabName.toLocaleLowerCase()}
                            key={index}
                            className={"w-full"}>
                            {children}
                        </TabsContent>
                    )
                }
            </Tabs>
            <div className={"py-16"}></div>
        </div>
    );
}
