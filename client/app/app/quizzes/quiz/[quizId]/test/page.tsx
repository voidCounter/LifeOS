"use client"
import {useQuery} from "@tanstack/react-query";
import {Quiz} from "@/types/QuizTypes/Quiz";
import {fetchQuizwithQuestions} from "@/api-handlers/quizzes";
import QuestionRenderer from "@/components/quizzes/Question/QuestionRenderer";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";

interface TestQuizProps {
    quizId: string
}

export default function LearnQuiz({params}: { params: TestQuizProps }) {
    const router = useRouter();
    const pathname = usePathname();

    const {data: quiz, isLoading, error} = useQuery<Quiz, Error>({
        queryKey: [`quiz-${params.quizId}`],
        queryFn: () => fetchQuizwithQuestions(params.quizId)
    })
    if (isLoading) return <div>...Loading</div>
    if (error) return <div>{error.message}</div>
    if (quiz == undefined) return <div>...Loading</div>

    return (
        <div className={"pt-10 flex flex-col gap-10 h-full "}>

            <div className={"flex flex-col gap-4"}>
                {
                    quiz?.questions?.map((question, index) => <QuestionRenderer
                        key={index}
                        question={question} mode={"View"} index={index}/>)
                }

                <div className={"h-40"}></div>
            </div>
            <div className={"fixed bottom-12 w-fit bg-background p-2" +
                " rounded-t-lg border shadow-lg"}
                 onClick={() => router.push(`${pathname}/testresult`)}>
                <div className={"gap-2 flex"}>
                    <Button className={"w-fit"}>Submit</Button>
                    <Button className={"w-fit"}
                            variant={"outline"}>Reset</Button>
                </div>
            </div>

        </div>
    );
}
