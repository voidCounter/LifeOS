"use client";
import {usePathname, useRouter} from "next/navigation";
import {feedItemViewOptions} from "@/config/FeedItemViewConfig";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React, {useState} from "react";
import {cn} from "@/lib/utils";
import Link from "next/link";
import FeedItemDetails from "@/app/app/feed/[feedId]/FeedItemDetails";

interface FeedItemLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export default function FeedItemLayout({
                                           children,
                                           className
                                       }: FeedItemLayoutProps) {
    const router = useRouter();
    const pathname = usePathname();
    const feedId = pathname.split("/")[pathname.split("/").length - 2];
    console.log("feedId", feedId);
    console.log("pathname", pathname);

    return (
        <div className={cn(className, "w-full px-2")}>
            {
                <Tabs
                    value={pathname.split("/").pop()?.toLowerCase()}
                    className="w-full flex flex-col items-center mt-4"
                >
                    <TabsList
                        className={`w-full sm:max-w-sm grid h-fit rounded-xl grid-cols-3`}
                    >
                        {
                            feedItemViewOptions.map((viewOption, index) =>
                                <TabsTrigger key={index}
                                             value={viewOption.tabName.toLowerCase()}
                                             className={"rounded-lg"}
                                >
                                    <Link
                                        href={`/app/feed/${feedId}/${viewOption.tabName.toLowerCase()}`}
                                        className={"w-full h-full"}>
                                        <div
                                            className={"rounded-lg flex flex-col" +
                                                " gap-2" +
                                                " justify-center items-center"}>
                                            <viewOption.tabIcon
                                                strokeWidth={1}
                                                className={"w-6" +
                                                    " h-6"}/>
                                            {viewOption.tabName.charAt(0).toUpperCase() + viewOption.tabName.slice(1)}
                                        </div>
                                    </Link>
                                </TabsTrigger>
                            )
                        }
                    </TabsList>
                    {
                        feedItemViewOptions.map((viewOption, index) =>
                            <TabsContent
                                value={viewOption.tabName.toLocaleLowerCase()}
                                key={index}
                                className={"w-full"}>
                                {children}
                            </TabsContent>
                        )
                    }
                </Tabs>
            }
            <div className={"py-16"}></div>
        </div>);
}