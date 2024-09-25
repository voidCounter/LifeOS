import {Quiz} from "@/types/QuizTypes/Quiz";
import {QuizTest} from "@/types/QuizTypes/QuizTest";
import {Languages} from "@/types/Language";
import axios, {Axios, AxiosResponse} from "axios";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {z} from "zod";
import {QuizEvaluationType} from "@/types/QuizTypes/QuestionEvaluationType";
import {QuizTestResultType} from "@/types/QuizTypes/QuizTestResultType";
import {useAuthStore} from "@/store/AuthStore";

export async function fetchLocalQuizzes(): Promise<Quiz[]> {
    const response = await fetch('/quizzes.json'); // Path to your local
    // JSON
    // file
    if (!response.ok) throw new Error('Failed to fetch created quizzes!');
    return response.json();
}

export async function fetchQuizTests(): Promise<QuizTest[]> {
    const response: AxiosResponse<QuizTest[]> = await AxiosInstance.get("/quiz/quizTests");
    if (response.data) {
        response.data.sort((a, b) => {
            return a.testTakenAt < b.testTakenAt ? 1 : -1;
        });
    }
    return response.data;
}

export async function fetchQuizwithQuestions(quizId: String): Promise<Quiz> {
    const response = await AxiosInstance.get(`/quiz/${quizId}`);
    console.log(response.data);
    return response.data;
}

export async function fetchQuizTest(quizTestId: string): Promise<QuizTest> {
    const response = await AxiosInstance.get(`/quiz/quiz-test/${quizTestId}`);
    return response.data;
}

export async function fetchQuizTestResults(data: QuizEvaluationType): Promise<QuizTestResultType> {
    const response = await AxiosInstance.post("/quiz/evaluate", data);
    return response.data;
}

export async function fetchLanguages(): Promise<Languages> {
    const {data}: { data: Languages } = await axios.get('/isoLangs.json');
    return data;
}

export interface createdQuizResponse {
    quizId: string;
}

export async function fetchQuizzesCreatedByUser(userId: string): Promise<Quiz[]> {
    // const useruseAuthStore();
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
