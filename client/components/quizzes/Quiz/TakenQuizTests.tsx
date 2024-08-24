import {useQuery} from "@tanstack/react-query";
import {Quiz} from "@/types/QuizTypes/Quiz";
import {fetchLocalQuizzes, fetchQuizTests} from "@/api-handlers/quizzes";
import QuizCard from "./QuizCard";
import {QuizTest} from "@/types/QuizTypes/QuizTest";

export default function TakenQuizTests() {
    const {
        data: quiztests,
        isLoading,
        error
    } = useQuery<QuizTest[], Error>({
        queryKey: ['takenQuizTests'],
        queryFn: fetchQuizTests
    });

    if (isLoading) return <div>...Loading</div>
    if (error) return <div>{error.message}</div>
    return (<div className={"flex flex-col gap-2"}>
        {
            quiztests?.map((quizTest: QuizTest) => <QuizCard
                key={quizTest.quizTestId} quiz={quizTest.quiz} quizTest={quizTest}
                variant={"quizTest"} showCreator={false} showCategories={false} showRating={false}/>)
        }
    </div>)
}