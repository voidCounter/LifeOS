"use client"
import {useRouter} from "next/navigation";
import SearchandCreate from "@/app/app/quizzes/components/SearchandCreate";

export default function Explore() {
    const router = useRouter();
    return (
        <main>
            {/* Search and create */}
            <SearchandCreate/>
        </main>
    );
}