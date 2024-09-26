import {InsightType} from "@/types/FeedTypes/InsightType";
import InsightCard from "@/app/app/feed/[feedId]/[tab]/InsightCard";

interface InsightViewerProps {
    insights: InsightType[]
}

export default function InsightViewer({insights}: InsightViewerProps) {
    return <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
        {
            insights.map((insight) => <InsightCard key={insight.id}
                                                   insight={insight}/>)
        }
    </div>

}