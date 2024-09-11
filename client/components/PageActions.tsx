"use client";
import {usePathname, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {useQuizCreationStore} from "@/store/QuizCreationStore";
import SaveQuizDialog from "@/components/quizzes/Quiz/SaveQuizDialog";

export default function PageActions() {
    const {questionCount, setShowSaveQuizModal} = useQuizCreationStore();
    const pathname = usePathname();
    if (pathname.startsWith("/app/quizzes/create") && questionCount > 0) {
        return (
            <div>
                <SaveQuizDialog/>
            </div>
        );
    }
}