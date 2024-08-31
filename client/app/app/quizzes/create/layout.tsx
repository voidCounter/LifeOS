import React from "react";
import QuizCreationLayout from "@/app/app/quizzes/create/QuizCreationLayout";

export default function createLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <div className={"w-full"}>
            <QuizCreationLayout>{children}</QuizCreationLayout>
        </div>
    );
}