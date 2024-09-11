"use client";
import {useQuery} from "@tanstack/react-query";
import {Quiz} from "@/types/QuizTypes/Quiz";
import {fetchQuizwithQuestions} from "@/api-handlers/quizzes";
import {Badge} from "@/components/ui/badge";
import QuizRating from "@/components/quizzes/Quiz/QuizRating";
import {UserAvatar} from "@/components/UserAvatar";
import {Button} from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";

import QuestionRenderer from "@/components/quizzes/Question/QuestionRenderer";
import {usePathname, useRouter} from "next/navigation";
import {AxiosError} from "axios";
import ErrorCmp from "@/components/ErrorCmp";
import Loading from "@/app/app/loading";

interface QuizDetailsProps {
    quizId: string
}

export default function QuizDetails({params}: { params: QuizDetailsProps }) {
    const pathname = usePathname();
    const router = useRouter();

    const {data: quiz, isLoading, error, isError} = useQuery<Quiz, Error>({
        queryKey: [`quiz-${params.quizId}`],
        queryFn: () => fetchQuizwithQuestions(params.quizId)
    })

    // useErrorNotification({
    //     isError,
    //     description: error?.message ?? "",
    //     title: "Failed to load quiz"
    // });


    if (isLoading) return <Loading/>
    if (isError) {
        const axiosError = error as AxiosError;
        return <ErrorCmp status={axiosError.status ?? 0} title={error?.name}
                         message={error?.message}/>
    }
    if (quiz == undefined) return <div></div>
    return (
        <div
            className="flex-col justify-start items-start gap-4 inline-flex mt-10 w-full">
            <div
                className={"flex-col gap-2 items-start justify-start flex"}>
                <h1
                    className={"text-3xl"}>{quiz?.quizTitle}</h1>
                <div
                    className={"flex flex-row gap-2 justify-center items-center"}>
                    {quiz?.categories?.map((item, index) =>
                        <Badge
                            key={index}
                            variant={"outline"}>{item}</Badge>
                    )}
                    <Badge
                        variant={"outline"}>{quiz?.questions?.length} questions</Badge>
                    <QuizRating rating={quiz?.rating ?? ""}/>
                </div>
            </div>
            <UserAvatar avatarURL={quiz?.creator?.avatarUrl ?? ""}
                        name={quiz?.creator?.name}
                        userName={quiz?.creator?.username}/>
            <div className={"flex flex-row gap-3 mt-4"}><Button
                variant={"default"}
                onClick={() => router.push(`${pathname}/test`)}>Practice
                test</Button>
                <Button variant={"secondary"}
                        onClick={() => router.push(`${pathname}/learn`)}>Learn</Button>
            </div>
            <hr className={"bg-muted w-full"}/>
            <section className="w-full">
                <SectionHeader title={"Questions"} description={""}/>
                <div className={"flex flex-col gap-2 mt-6"}>
                    {
                        quiz?.questions?.map((question, index) =>
                            <QuestionRenderer question={question}
                                              index={index}
                                              key={question.questionId}
                                              showEditingOption={false}
                                              mode={"View"}/>
                        )
                    }
                </div>
                <div className={"py-12"}></div>
            </section>
        </div>
    );
}