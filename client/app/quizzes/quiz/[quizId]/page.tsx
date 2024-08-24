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

interface QuizDetailsProps {
    quizId: string
}

export default function QuizDetails({params}: { params: QuizDetailsProps }) {
    const pathname = usePathname();
    const router = useRouter();

    const {data: quiz, isLoading, error} = useQuery<Quiz, Error>({
        queryKey: [`quiz-${params.quizId}`], queryFn: fetchQuizwithQuestions
    })
    if (isLoading) return <div>...Loading</div>
    if (error) return <div>{error.message}</div>
    if (quiz == undefined) return <div>...Loading</div>
    return (
        <div
            className="flex-col justify-start items-start gap-4 inline-flex mt-10 w-full">
            <div className={"flex-col gap-2 items-start justify-start flex"}><h1
                className={"text-3xl"}>{quiz?.quizTitle}</h1>
                <div
                    className={"flex flex-row gap-2 justify-center items-center"}>
                    <Badge
                        variant={"outline"}>{quiz?.questionCount} questions</Badge>
                    <QuizRating rating={quiz?.rating ?? ""}/>
                </div>
            </div>
            <UserAvatar avatarURL={quiz?.user?.avatarURL ?? ""} name={""}
                        userName={quiz?.user?.username}/>
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
                            <QuestionRenderer question={question} index={index}
                                              key={question.questionId}
                                              showEditingOption={false}
                                              mode={"View"}/>
                        )
                    }
                </div>
            </section>

        </div>);
}