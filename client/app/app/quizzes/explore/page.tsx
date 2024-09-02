"use client"
import {useRouter} from "next/navigation";
import SearchandCreate from "@/app/app/quizzes/components/SearchandCreate";

export default function Explore() {
    const router = useRouter();
    return (
        <main className={"w-full flex justify-center"}>
            <div className={"flex flex-col gap-8 max-w-[800px]"}>

            </div>
            {/* Search and create */}
            <SearchandCreate/>
        </main>
    );
}