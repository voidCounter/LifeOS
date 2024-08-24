// add layout.tsx
import React from "react";

export default function QuizLayout({
                                       children, // will be a page or nested layout
                                   }: {
    children: React.ReactNode
}) {
    return (
        <main className="w-full h-full">
            {children}
            <div className={"h-32"}></div>
        </main>
    )
}
