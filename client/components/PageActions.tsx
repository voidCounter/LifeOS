"use client";
import {usePathname, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {useQuizCreationStore} from "@/store/QuizCreationStore";

export default function PageActions() {
    const router = useRouter();
    const {questionCount} = useQuizCreationStore();
    const pathname = usePathname();
    if (pathname.startsWith("/app/quizzes/create") && questionCount > 0) {
        return (
            <div>
                <Button variant={"outline"} size={"sm"}>Save quiz</Button>
            </div>
        );
    }
}