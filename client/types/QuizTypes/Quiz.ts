import {User} from "@/types/User";
import {Question} from "@/types/QuizTypes/Question";

export interface Quiz {
  quizId: string;
  user: User
  createdAt: string;
  published: boolean;
  deleted: boolean;
  quizTitle: string | null;
  lastModified_at: string | null;
  category: string | null;
  rating: string | null;
  questionCount: number | null;
  questions?: Question[];
  quizDescription: string | null;
}
