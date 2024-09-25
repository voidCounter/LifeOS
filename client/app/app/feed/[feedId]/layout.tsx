import React from "react";
import FeedItemLayout from "@/app/app/feed/[feedId]/FeedItemLayout";
import FeedItemDetails from "@/app/app/feed/[feedId]/FeedItemDetails";

export default function createLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <div className={"w-full grid grid-cols-1" +
            ""}>
            <FeedItemDetails/>
            <FeedItemLayout
                className={"w-full"}>{children}</FeedItemLayout>
        </div>
    );
}
