"use client"
import {usePathname, useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {fetchQuizTest,} from "@/api-handlers/quizzes";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import Image from "next/image";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Repeat2} from "lucide-react";
import {useQuizTestResultStore, useQuizTestStore} from "@/store/QuizTestStore";
import Loading from "@/app/app/loading";

interface TestResultParams {
    quizTestId: string
}

export default function TestResult({params}: { params: TestResultParams }) {
    const router = useRouter();
    const pathname = usePathname();
    const {questionsInQuizTest, clearUserQuizTest} = useQuizTestStore();
    const {quizTestResult} = useQuizTestResultStore();

    const {
        data: quizTest,
        isFetching,
        isLoading,
        error,
        isSuccess
    } = useQuery({
        queryKey: [`quiztest-${params.quizTestId}`],
        queryFn: () => fetchQuizTest(params.quizTestId),
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
    const [toCongratulate, setToCongratulate] = useState(false);

    useEffect(() => {
        setToCongratulate((quizTest?.quizTestScore ?? 0) >= (quizTest?.quiz?.numberOfQuestions ?? 0) / 2);
    }, [quizTest])

    useEffect(() => {
        clearUserQuizTest();
    }, [isSuccess]);

    if (isLoading || isFetching) return <Loading text={"Evaluating your" +
        " answers..."}/>
    if (error) return <div>{error.message}</div>
    if (quizTest == undefined) return <Loading></Loading>


    return (
        <div className={"flex flex-col w-full justify-center" +
            " items-center" +
            " pt-4"}>
            <div className={"flex flex-col gap-4 p-4"}>
                <Card className={`w-full max-w-md py-8 px-12 flex flex-col gap-4" +
                " justify-center items-center ${toCongratulate ? "bg-gradient-to-r from-blue-200/40 to-cyan-200/40" : "bg-gradient-to-r from-orange-300/40 to-red-300/40"}`}>
                    <Badge variant={"outline"} className={"w-fit" +
                        " text-foreground/40" +
                        " border-foreground/40"}>Quiz
                        Result</Badge>
                    <CardTitle
                        className={"my-4"}>{quizTest.quiz.quizTitle}</CardTitle>
                    <CardContent className={"p-4 flex flex-col gap-4" +
                        " justify-center items-center"}>
                        <Image
                            src={`${toCongratulate ? "/quiz-test-illustration.svg" : "/quiz-test-failure.svg"}`}
                            alt={"quiz" +
                                " test" +
                                " character"} width={"100"} height={"100"}/>
                        <div className={"text-3xl font-bold my-4"}>
                            {
                                (!toCongratulate) ?
                                    <span
                                        className={"text-destructive"}>Try again!</span> :
                                    <span
                                        className={"text-success-foreground"}>Congratulations!</span>
                            }
                        </div>
                        <div className={"text-muted-foreground"}>Your Score
                        </div>
                        <div
                            className={"text-6xl font-black"}>
                        <span
                            className={`${toCongratulate ? "text-success-foreground" : "text-destructive"}`}>{quizTest?.quizTestScore}</span>/<span>{quizTest.quiz.numberOfQuestions}</span>
                        </div>
                        <Badge
                            variant={"default"}
                            className={`${toCongratulate ? "bg-success-foreground" : "bg-destructive"}`}>+{quizTest?.quizTestScore}xp</Badge>
                    </CardContent>
                </Card>
                <div className={"w-full flex flex-row gap-2"}>
                    <Button variant={"secondary"}
                            onClick={() => router.push(`/app/quizzes/quiz/${quizTest.quiz.quizId}/quiz-test`)}>
                        <Repeat2 className={"w-4 h-4 mr-2"}/>
                        Try
                        again</Button>
                    <Button variant={"outline"}
                            onClick={() => router.push(`/app/quizzes/quiz/${quizTest?.quiz?.quizId}/learn`)}>Learn</Button>

                </div>
            </div>
        </div>
    );
}