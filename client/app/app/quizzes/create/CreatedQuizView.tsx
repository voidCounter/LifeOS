"use client";
import {cn} from "@/lib/utils";
import {useQuizCreationStore} from "@/store/QuizCreationStore";
import QuestionRenderer from "@/components/quizzes/Question/QuestionRenderer";

export default function CreatedQuizView({className}: { className?: string }) {
    const {questions} = useQuizCreationStore();
    return (
        <div className={`${cn(className)} w-full h-screen overflow-y-scroll`}>
            <div className={"flex flex-col gap-4"}>
                {
                    questions?.map((question, index) =>
                        <QuestionRenderer question={question} index={index}
                                          key={index}
                                          showEditingOption={true}
                                          mode={"View"}/>
                    )
                }
            </div>
            <div className={"py-52"}></div>
        </div>);
}