import {Quiz} from "@/types/QuizTypes/Quiz";

export async function fetchLocalQuizzes(): Promise<Quiz[]> {
  const response = await fetch('/quizzes.json'); // Path to your local
  // JSON
  // file
  if (!response.ok) throw new Error('Failed to fetch local quizzes');
  return response.json();
}