import {QuestionType} from "@/types/QuizTypes/QuestionTypes";

export interface QuestionEvaluationType {
    questionId: string
    questionType: QuestionType
    userAnswer: string[],
}

export interface QuizEvaluationType {
    quizId: string,
    questions: QuestionEvaluationType[],
}
