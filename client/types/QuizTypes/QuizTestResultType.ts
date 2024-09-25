import {QuizTest} from "@/types/QuizTypes/QuizTest";

export interface QuestionTestResultType {
    questionId: string,
    isCorrect: boolean,
    comment: string,
}

export interface QuizTestResultType {
    quizTest: QuizTest,
    questions: QuestionTestResultType[],
}