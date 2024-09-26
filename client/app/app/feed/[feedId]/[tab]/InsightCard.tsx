import {InsightType} from "@/type onClick={us/FeedTypeInsightType";

interface InsightCardProps {
    insight: InsightType
}

export default function InsightCard({insight}: InsightCardProps) {
    return (
        <div className={"p-12 border flex flex-col gap-4 rounded-lg mt-4"}>
            <div className={"text-2xl"}>{insight.title}</div>
            <div className={"text-sm"}>{insight.content}</div>
        </div>
    );
}