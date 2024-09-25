"use client";
import ImageComponent from "@/components/ImageComponent";
import {LinkIcon} from "lucide-react";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import React from "react";
import {usePathname} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {FeedItemType} from "@/types/FeedTypes/FeedItemType";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {toast} from "sonner";
import Loading from "@/app/app/loading";


export default function FeedItemDetails() {
    const pathname = usePathname();
    const feedId = pathname.split("/")[pathname.split("/").length - 2];
    console.log(pathname);
    const {
        data: feedItem,
        isSuccess,
        isLoading,
        isError,
        isPending,
        isFetching,
        isFetched,
    } = useQuery({
        queryKey: ["userFeedItem", feedId],
        queryFn: async (): Promise<FeedItemType> => {
            return await AxiosInstance.get(`/feed/${feedId}`).then((response: {
                data: FeedItemType
            }) => response.data)
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
    })
    if (isLoading) {
        return <div className={"w-full h-72 animate-pulse"}></div>
    }
    if (isError) {
        toast.error("Error fetching user feed");
    }
    const getDisplayURL = (url: string) => {
        if (url.length == 0) return "";
        const subs = url.substring(url.indexOf("//") + 2);
        return subs.substring(0, subs.indexOf("/"));
    }
    return (
        <div>
            <div className={"relative w-full h-40 overflow-hidden group"}>
                <ImageComponent src={feedItem?.thumbnail ?? ""}
                                alt={"thumbnail"}
                                className={"transition-transform" +
                                    " duration-300 transform group-hover:scale-110"}/>
            </div>
            <div className={"flex flex-col w-full mt-4"}>
                <h3 className={"text-sm text-muted-foreground"}>{feedItem?.estimatedDurationMinutes} min
                    read</h3>
                <div>
                    <h1 className={"text-2xl font-bold line-clamp-2 truncate"}>{feedItem?.title}</h1>
                    <h2 className={"text-base"}>{feedItem?.description}</h2>
                </div>
                <div className={"flex flex-row gap-1 items-center mt-4" +
                    " text-muted-foreground"}>
                    <LinkIcon strokeWidth={1} className={"w-4 h-4"}/>
                    <Link href={feedItem?.url ?? ""}
                          className={"line-clamp-1"}>{getDisplayURL(feedItem?.url ?? "")}
                    </Link>
                </div>
                <div className={"flex flex-row flex-wrap gap-1"}>
                    {
                        feedItem?.categories?.map((category: string, index: number) =>
                            <Badge
                                variant={"outline"}
                                key={index}>{category}</Badge>)
                    }
                </div>
            </div>
        </div>
    );
}