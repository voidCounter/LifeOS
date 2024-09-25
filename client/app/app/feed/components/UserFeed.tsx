"use client";
import {useQuery} from "@tanstack/react-query";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {useAuthStore} from "@/store/AuthStore";
import {FeedItemType} from "@/types/FeedTypes/FeedItemType";
import {toast} from "sonner";
import Loading from "@/app/app/loading";
import FeedCard from "@/app/app/feed/components/FeedCard";
import FeedItemCard from "@/app/app/feed/components/FeedItemCard";

export default function UserFeed() {
    const {authenticatedUser} = useAuthStore();
    const {data: feedItems, isSuccess, isLoading, isError} = useQuery({
        queryKey: ["userFeed"],
        queryFn: async (): Promise<FeedItemType[]> => {
            return await AxiosInstance.get(`/feed/getFeed?user=${authenticatedUser?.userId}`).then((response) => response.data)
        },
        enabled: authenticatedUser != null && authenticatedUser.userId != null
    })
    if (isError) {
        toast.error("Error fetching user feed");
    }
    if (isSuccess) {
        console.log(feedItems)
    }
    if (isLoading) return <Loading text={"Grabbing your reads..."}></Loading>
    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 pt-16" +
            " gap-3"}>
            {
                feedItems?.map((feedItem, index) => <FeedItemCard
                    feedItem={feedItem} key={index}/>)
            }
            <div className={"py-16"}></div>
        </div>
    );
}