import React from "react";
import QuizCreationLayout from "@/app/app/quizzes/create/QuizCreationLayout";
import CreatedQuizView from "@/app/app/quizzes/create/CreatedQuizView";

export default function createLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <div className={"w-full grid grid-cols-1 lg:grid-cols-2 gap-4"}>
            <QuizCreationLayout>{children}</QuizCreationLayout>
            <CreatedQuizView></CreatedQuizView>
        </div>
    );
}