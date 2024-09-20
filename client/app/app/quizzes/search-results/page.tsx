"use client";
import SearchandCreate from "@/components/SearchandCreate";
import {useSearchStore} from "@/store/SearchStore";
import {useQuery} from "@tanstack/react-query";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {AxiosResponse} from "axios";
import {Quiz} from "@/types/QuizTypes/Quiz";
import QuizCard from "@/components/quizzes/Quiz/QuizCard";

export default function SearchResult() {
    const fetchSearchResult = async (searchQuery: string) => {
        const response: AxiosResponse<Array<Quiz> | []> = await AxiosInstance.get(`/quizzes/search?q=${searchQuery}`);
        return response.data;
    }

    const {searchQuery, setSearchQuery} = useSearchStore();
    const {isLoading, error, data: quizzes} = useQuery({
        queryFn: () => fetchSearchResult(searchQuery),
        queryKey: [searchQuery],
        enabled: searchQuery.length > 0
    })
    return (
        <div className={"flex flex-col gap-4"}>
            <SearchandCreate/>
            <span>Search results for {`"${searchQuery}"`}</span>
            {
                quizzes?.map((quiz, index) =>
                    <QuizCard quiz={quiz} key={quiz.quizId}/>
                )
            }
        </div>
    );
}