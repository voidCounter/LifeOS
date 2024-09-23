"use client"
import {useMutation, useQuery} from "@tanstack/react-query";
import {Quiz} from "@/types/QuizTypes/Quiz";
import {
    fetchQuizTestResults,
    fetchQuizwithQuestions
} from "@/api-handlers/quizzes";
import QuestionRenderer from "@/components/quizzes/Question/QuestionRenderer";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";
import Loading from "@/app/app/loading";
import {toast} from "sonner";
import {useQuizTestResultStore, useQuizTestStore} from "@/store/QuizTestStore";

interface TestQuizProps {
    quizId: string
}

export default function LearnQuiz({params}: { params: TestQuizProps }) {
    const router = useRouter();
    const {questionsInQuizTest, clearUserQuizTest} = useQuizTestStore();
    const {quizTestResult, setQuizTestResult} = useQuizTestResultStore();
    const pathname = usePathname();

    const {data: quiz, isLoading, error} = useQuery<Quiz, Error>({
        queryKey: [`quiz-${params.quizId}`],
        staleTime: 1000 * 60 * 5,  // 5 minutes
        queryFn: () => fetchQuizwithQuestions(params.quizId),
        refetchOnMount: false,
    })

    const {mutate: evaluateQuizTest, data, isPending} = useMutation({
        mutationFn: () => fetchQuizTestResults({
            quizId: params.quizId,
            questions: questionsInQuizTest
        }),
        onMutate: () => {
            toast.loading("Evaluating your answers...");
        },
        onSettled: () => {
            toast.dismiss();
        },
        onSuccess: (data) => {
            console.log(data);
            setQuizTestResult({
                quizId: params.quizId,
                questions: data.questions
            });
            router.push(`${pathname}/${data.quizTest.quizTestId}`);
        }
    })

    if (isLoading) return <Loading/>
    if (error) {
        toast.error("Error loading quiz");
    }
    if (quiz == undefined) return <div>No questions to show</div>

    return (
        <div className={"pt-10 flex flex-col gap-10 h-full "}>
            <div className={"flex flex-col gap-4"}>
                {
                    quiz?.questions?.map((question, index) => <QuestionRenderer
                        key={index}
                        question={question} mode={"Test"} index={index}/>)
                }

                <div className={"h-40"}></div>
            </div>
            <div className={"fixed bottom-12 w-fit bg-background p-2" +
                " rounded-t-lg border shadow-lg"}>
                <div className={"gap-2 flex"}>
                    <Button className={"w-fit"} disabled={isPending}
                            onClick={() => {
                                evaluateQuizTest();
                            }}>Submit</Button>
                    <Button className={"w-fit"} onClick={() => {
                        clearUserQuizTest();
                        location.reload();
                    }} disabled={isPending}
                            variant={"outline"}>Reset</Button>
                </div>
            </div>

        </div>
    );
}
