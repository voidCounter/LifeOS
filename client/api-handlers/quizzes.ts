import {Quiz} from "@/types/QuizTypes/Quiz";
import {QuizTest} from "@/types/QuizTypes/QuizTest";
import {Languages} from "@/types/Language";
import axios from "axios";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {z} from "zod";

export async function fetchLocalQuizzes(): Promise<Quiz[]> {
    const response = await fetch('/quizzes.json'); // Path to your local
    // JSON
    // file
    if (!response.ok) throw new Error('Failed to fetch created quizzes!');
    return response.json();
}

export async function fetchQuizTests(): Promise<QuizTest[]> {
    const response = await fetch('/quiztests.json'); // Path to your local
    // JSON
    // file
    if (!response.ok) throw new Error('Failed to fetch quiz tests!');
    return response.json();
}

export async function fetchQuizwithQuestions(quizId: String): Promise<Quiz> {
    const response = await AxiosInstance.get(`/quiz/${quizId}`);
    console.log(response.data);
    return response.data;
}

export async function fetchQuizTest(): Promise<QuizTest> {
    const response = await fetch('/quiztest.json');

    if (!response.ok) throw new Error('Failed to fetch the quiz with questions!')
    return response.json();
}

export async function fetchLanguages(): Promise<Languages> {
    const {data}: { data: Languages } = await axios.get('/isoLangs.json');
    return data;
}

export interface createdQuizResponse {
    quizId: string;
}

export async function fetchQuizzesCreatedByUser(userId: string): Promise<Quiz[]> {
    const {data}: {
        data: Quiz[]
    } = await AxiosInstance.get(`/quiz/createdBy/${userId}`);
    console.log(data);
    return data;
}

export async function saveQuiz(data: any): Promise<createdQuizResponse> {
    const response = await AxiosInstance.post('/quiz/save', data);
    return response.data;
}
