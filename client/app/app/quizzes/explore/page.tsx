"use client"
import {useRouter} from "next/navigation";
import SearchandCreate from "@/components/SearchandCreate";
import {useQuery} from "@tanstack/react-query";
import {Quiz} from "@/types/QuizTypes/Quiz";
import {fetchQuizzesCreatedByUser} from "@/api-handlers/quizzes";
import {AxiosInstance} from "@/utils/AxiosInstance";
import QuizCard from "@/components/quizzes/Quiz/QuizCard";
import Loading from "@/app/app/loading";

export default function Explore() {
    const router = useRouter();

    const {
        data: quizzes,
        isLoading,
        error,
        isError

    } = useQuery<Quiz[], Error>({
        queryKey: ['quizzes'],
        queryFn: async () => {
            return await AxiosInstance.get("/quiz/getQuizzes").then(response => response.data);
        }
    });
    if (isLoading) {
        return <Loading text={"Loading quizzes..."}></Loading>
    }
    return (
        <main className={"w-full flex justify-center"}>
            <div className={"flex flex-col gap-8 max-w-[800px]"}>

            </div>
            {/* Search and create */}
            <div className={"flex flex-col gap-8"}>
                <SearchandCreate showSearchButton={false}
                                 onCreateUrl={"/app/quizzes/create/prompt"}/>

                <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
                    {
                        quizzes?.map((quiz: Quiz) => <QuizCard quiz={quiz}
                                                               key={quiz.quizId}/>)
                    }
                </div>
                <div className={"p-16"}></div>
            </div>

        </main>
    );
}