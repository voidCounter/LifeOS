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
import ContentViewer from "@/app/app/feed/[feedId]/[tab]/ContentViewer";
import SummaryViewer from "@/app/app/feed/[feedId]/[tab]/SummaryViewer";
import InsightViewer from "@/app/app/feed/[feedId]/[tab]/InsightViewer";

interface FeedItemTabProps {
    tab: string;
}

export default function FeedItemTab({params}: { params: FeedItemTabProps }) {
    const pathName = usePathname();
    const feedId = pathName.split("/")[pathName.split("/").length - 2];

    const {
        data,
        isSuccess,
        isError,
        isLoading,
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
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
    if (isError) {
        toast.error("Error fetching user content");
    }
    if (isSuccess) {
        console.log(data)
    }
    if (isLoading) {
        return <Loading text={"Generating the " + params.tab}></Loading>
    }

    if (params.tab == 'content') {
        return <ContentViewer content={data ?? "No content to show"}/>
    } else if (params.tab == 'summary') {
        return <SummaryViewer summary={data ?? "No summary to show"}/>
    } else if (params.tab == 'insights') {
        return <InsightViewer insights={data ?? "No insights to show"}/>
    }
    return (
        <div>hellof</div>
    )

}