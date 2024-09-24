import {useQuery} from "@tanstack/react-query";
import {Quiz} from "@/types/QuizTypes/Quiz";
import {fetchLocalQuizzes, fetchQuizTests} from "@/api-handlers/quizzes";
import QuizCard from "./QuizCard";
import {QuizTest} from "@/types/QuizTypes/QuizTest";
import Loading from "@/app/app/loading";

export default function TakenQuizTests() {
    const {
        data: quiztests,
        isLoading,
        error,
        isSuccess
    } = useQuery<QuizTest[], Error>({
        queryKey: ['takenQuizTests'],
        queryFn: fetchQuizTests
    });

    if (isSuccess) console.log(quiztests);
    if (isLoading) return <Loading text={"Grabbing quiz tests."}/>
    if (error) return <div>{error.message}</div>
    return (<div className={"grid grid-cols-1 sm:grid-cols-2 " +
        " gap-2"}>
        {
            quiztests?.map((quizTest: QuizTest) => <QuizCard
                key={quizTest.quizTestId} quiz={quizTest.quiz}
                quizTest={quizTest}
                variant={"quizTest"} showCreator={false} showCategories={false}
                showRating={false}/>)
        }
        <div className={"py-16"}></div>
    </div>)
}