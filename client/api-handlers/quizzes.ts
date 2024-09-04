import {Quiz} from "@/types/QuizTypes/Quiz";
import {QuizTest} from "@/types/QuizTypes/QuizTest";
import {Languages} from "@/types/Language";
import axios from "axios";

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

export async function fetchQuizwithQuestions(): Promise<Quiz> {
    const response = await fetch('/Quiz.json');

    if (!response.ok) throw new Error('Failed to fetch the quiz with questions!')
    return response.json();
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
