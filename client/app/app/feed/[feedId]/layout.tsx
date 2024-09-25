import React from "react";
import FeedItemLayout from "@/app/app/feed/[feedId]/FeedItemLayout";

export default function createLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <div className={"w-full grid grid-cols-1" +
            ""}>
            <FeedItemLayout
                className={"w-full overflow-hidden"}>{children}</FeedItemLayout>
        </div>
    );
}
