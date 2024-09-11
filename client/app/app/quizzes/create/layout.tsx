import React from "react";
import QuizCreationLayout from "@/app/app/quizzes/create/QuizCreationLayout";
import CreatedQuizView from "@/app/app/quizzes/create/CreatedQuizView";

export default function createLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <div className={"w-full grid grid-cols-1 lg:grid-cols-5 gap-8" +
            ""}>
            <QuizCreationLayout
                className={"lg:col-span-2 mt-12"}>{children}</QuizCreationLayout>
            <CreatedQuizView
                className="lg:col-span-3 h-screen overflow-y-scroll px-1 py-12"></CreatedQuizView>
        </div>
    );
}