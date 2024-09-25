import MDXViewer from "@/components/MDXViewer";

interface ContentViewerProps {
    content: string
}

export default function ContentViewer({content}: ContentViewerProps) {
    return (
        <div>
            {content}
            {/*<MDXViewer content={content}/>*/}
        </div>
    )

}
