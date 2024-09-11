import {User} from "@/types/User";
import {Question} from "@/types/QuizTypes/Question";

export interface Quiz {
    quizId: string;
    creator: User
    createdAt: string;
    published: boolean;
    deleted: boolean;
    quizTitle: string | null;
    lastModified_at: string | null;
    categories: string[],
    rating: string | null;
    numberOfQuestions: number | null;
    questions?: Question[];
    quizDescription: string | null;
}
