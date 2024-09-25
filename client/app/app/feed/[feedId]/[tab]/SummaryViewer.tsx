import MDXViewer from "@/components/MDXViewer";

interface SummaryViewerProps {
    summary: string
}

export default function SummaryViewer({summary}: SummaryViewerProps) {
    return (
        <div>
            <MDXViewer content={summary}/>
        </div>
    )
}