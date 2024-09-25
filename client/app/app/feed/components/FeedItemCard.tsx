"use client";
import {FeedItemType} from "@/types/FeedTypes/FeedItemType";
import Image from "next/image";
import {LinkIcon, MoreHorizontal, MoreVertical} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useRouter} from "next/navigation";
import ImageComponent from "@/components/ImageComponent";

interface FeedItemCardProps {
    feedItem: FeedItemType
}

export default function FeedItemCard({feedItem}: FeedItemCardProps) {
    const getDisplayURL = (url: string) => {
        const subs = url.substring(url.indexOf("//") + 2);
        return subs.substring(0, subs.indexOf("/"));
    }
    const router = useRouter();
    return (
        <div
            className={"relative flex flex-row gap-2 w-full bg-zinc-50 p-4" +
                " rounded-lg cursor-pointer hover:bg-zinc-100"}
            onClick={() => router.push(`/app/feed/${feedItem.itemId}/content`)}>
            <div className={"relative flex"}
                 style={{width: "150px", height: "100%"}}>
                <ImageComponent src={feedItem?.thumbnail ?? ""}
                                alt={"thumbnail"}
                                className={"rounded-lg"}/>
            </div>
            <div className={"flex flex-col w-full"}>
                <h3 className={"text-sm text-muted-foreground"}>{feedItem.estimatedDurationMinutes} min
                    read</h3>
                <div className={"w-full"}>
                    <p className={"text-lg line-clamp-1 truncate text-wrap"}>{feedItem.title}</p>
                </div>
                <div className={"flex flex-row gap-1 items-center" +
                    " text-muted-foreground"}>
                    <LinkIcon strokeWidth={1} className={"w-4 h-4"}/>
                    <Link href={feedItem.url}
                          className={"line-clamp-1"}>{getDisplayURL(feedItem.url)}
                    </Link>
                </div>
                <div className={"flex flex-row flex-wrap gap-1"}>
                    {
                        feedItem.categories?.map((category, index) => <Badge
                            variant={"outline"}
                            key={index}>{category}</Badge>)
                    }
                </div>
            </div>
            <Button variant={"ghost"} size={"icon"}
                    onClick={() => {
                    }}>
                <MoreHorizontal strokeWidth={2} className={"w-8"}/>
            </Button>
        </div>
    );
}