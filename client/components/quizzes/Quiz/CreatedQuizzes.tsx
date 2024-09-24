import {useQuery} from "@tanstack/react-query";
import {Quiz} from "@/types/QuizTypes/Quiz";
import {
    fetchLocalQuizzes,
    fetchQuizzesCreatedByUser
} from "@/api-handlers/quizzes";
import QuizCard from "./QuizCard";
import {useAuthStore} from "@/store/AuthStore";
import Loading from "@/app/app/loading";
import {useErrorNotification} from "@/hooks/useErrorNotification";
import {AxiosError} from "axios";

export default function CreatedQuizzes() {
    const {authenticatedUser} = useAuthStore();
    const {
        data: quizzes,
        isLoading,
        error,
        isError

    } = useQuery<Quiz[], Error>({
        queryKey: ['quizzes'],
        queryFn: () => fetchQuizzesCreatedByUser(authenticatedUser ? authenticatedUser.userId : ""),
    });

    useErrorNotification({
        isError,
        title: "Error loading the quizzes",
        description: error?.message ?? "",
    })

    if (isLoading) return <Loading className={"mt-12"}/>
    return (<div className={"w-full h-full grid grid-cols-1 sm:grid-cols-2" +
        " gap-2"}>
        {
            quizzes?.map((quiz: Quiz) => <QuizCard
                key={quiz.quizId} quiz={quiz}
                variant={"createdByMe"}/>)
        }

        < div className={"py-16"}></div>
    </div>)
}