import {User} from "@/types/User";

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
  quizDescription: string | null;
}
