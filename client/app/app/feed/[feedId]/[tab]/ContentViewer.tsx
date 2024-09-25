import MDXViewer from "@/components/MDXViewer";
import ErrorBoundary from "@/components/ErrorBoundary";

interface ContentViewerProps {
    content: string
}

export default function ContentViewer({content}: ContentViewerProps) {
    return (
        <div>
            {/*{content.toWellFormed()}*/}
            <ErrorBoundary>
                <MDXViewer content={content}/>
            </ErrorBoundary>
        </div>
    )

}
