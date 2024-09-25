"use client"
import {usePathname} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {FeedItemType} from "@/types/FeedTypes/FeedItemType";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {toast} from "sonner";
import Loading from "@/app/app/loading";
import React from "react";
import {
    fetchFeedItemContent,
    fetchFeedItemInsights,
    fetchFeedItemSummary
} from "@/api-handlers/feeds";

interface FeedItemTabProps {
    tab: string;
}

export default function FeedItemTab({params}: { params: FeedItemTabProps }) {
    const pathName = usePathname();
    const feedId = pathName.split("/")[pathName.split("/").length - 2];

    const {
        data,
        isSuccess,
        isLoading,
        isError,
        isPending,
        isFetching
    } = useQuery({
        queryKey: ["userFeedItem", feedId, params.tab],
        queryFn: async () => {
            if (params.tab == "content") {
                return fetchFeedItemContent(feedId);
            } else if (params.tab == "summary") {
                return fetchFeedItemSummary(feedId);
            } else if (params.tab == "insights") {
                return fetchFeedItemInsights(feedId);
            } else {
                return "No content found"
            }
        },
    })
    if (isError) {
        toast.error("Error fetching user content");
    }
    if (isSuccess) {
        console.log(data)
    }
    if (isLoading || isPending || isFetching) return <div
        className={"animate-pulse bg-zinc-200"}></div>
    return (
        <div>
            {data}
        </div>
    )

}