// add layout.tsx
export default function QuizLayout({
                                       children, // will be a page or nested layout
                                   }: {
    children: React.ReactNode
}) {
    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            <nav></nav>
            {children}
        </section>
    )
}
