"use client";
import SearchandCreate from "@/components/SearchandCreate";
import {useQuery} from "@tanstack/react-query";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {AxiosResponse} from "axios";
import {Quiz} from "@/types/QuizTypes/Quiz";
import QuizCard from "@/components/quizzes/Quiz/QuizCard";
import Loading from "@/app/app/loading";
import {toast} from "sonner";
import {useSearchParams} from "next/navigation";
import React, {useEffect} from "react";
import SearchResultCmp from "@/app/app/quizzes/components/SearchResultCmp";

export default function SearchResult() {


    return (
        <div>
            <SearchResultCmp baseURL={"/quiz"}
                             renderItem={(item) => <QuizCard
                                 quiz={item as Quiz}/>}/>
        </div>
    );
}