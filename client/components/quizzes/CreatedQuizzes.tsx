import {useQuery} from "@tanstack/react-query";
import {Quiz} from "@/types/QuizTypes/Quiz";
import {fetchLocalQuizzes} from "@/api-handlers/quizzes";
import QuizCard from "@/components/quizzes/QuizCard";

export default function CreatedQuizzes() {
    const {
        data: quizzes,
        isLoading,
        error
    } = useQuery<Quiz[], Error>({
        queryKey: ['quizzes'],
        queryFn: fetchLocalQuizzes
    });

    if (isLoading) return <div>...Loading</div>
    if (error) return <div>{error.message}</div>
    return (<div className={"flex flex-col gap-2"}>
        {
            quizzes?.map((quiz: Quiz) => <QuizCard
                key={quiz.quizId} quiz={quiz}
                variant={"createdByMe"}/>)
        }
    </div>)
}