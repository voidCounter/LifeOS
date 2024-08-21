"use client";
import {useQuery} from "@tanstack/react-query";
import {Quiz} from "@/types/QuizTypes/Quiz";
import {fetchQuizwithQuestions} from "@/api-handlers/quizzes";
import {Badge} from "@/components/ui/badge";
import QuizRating from "@/components/quizzes/QuizRating";
import {UserAvatar} from "@/components/UserAvatar";
import {Button} from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";
import MultipleChoicequestionCmp
    from "@/components/quizzes/MultipleChoiceQuestionCmp";
import {MultipleChoiceQuestion} from "@/types/QuizTypes/MultipleChoiceQuestion";
import TrueFalseQuestionCmp from "@/components/quizzes/TrueFalseQuestionCmp";
import {TrueFalseQuestion} from "@/types/QuizTypes/TrueFalseQuestion";
import ShortAnswerQuestionCmp
    from "@/components/quizzes/ShortAnswerQuestionCmp";
import {ShortAnswerQuestion} from "@/types/QuizTypes/ShortAnswerQuestion";
import QuestionRenderer from "@/components/quizzes/QuestionRenderer";

interface QuizDetailsProps {
    quizId: string
}

export default function QuizDetails({params}: { params: QuizDetailsProps }) {
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
                variant={"default"}>Practice
                test</Button>
                <Button variant={"secondary"}>Learn</Button></div>
            <hr className={"bg-muted w-full"}/>
            <section className="w-full">
                <SectionHeader title={"Questions"} description={""}/>
                <div className={"flex flex-col gap-2 mt-6"}>
                    <QuestionRenderer questions={quiz?.questions ?? []} showEditingOption={true}
                                      mode={"View"}/>
                </div>
            </section>

        </div>);
}