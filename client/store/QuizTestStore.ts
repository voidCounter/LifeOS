import {create} from "zustand";
import {persist} from "zustand/middleware";
import {QuestionType} from "@/types/QuizTypes/QuestionTypes";
import {useQuery} from "@tanstack/react-query";
import {QuestionEvaluationType} from "@/types/QuizTypes/QuestionEvaluationType";
import {
    QuestionTestResultType,
    QuizTestResultType
} from "@/types/QuizTypes/QuizTestResultType";
import {state} from "sucrase/dist/types/parser/traverser/base";


interface QuizTestStore {
    quizId: string,
    setQuizId: (quizId: string) => void,
    questionsInQuizTest: QuestionEvaluationType[],
    setUserQuizTest: (userQuizTest: QuestionEvaluationType[]) => void,
    clearUserQuizTest: () => void,
    handleAnswerChange: (questionId: string, answer: string, questionType: QuestionType) => void,
}

interface QuizTestResultStore {
    quizTestResult: {
        quizId: string,
        quizTestId: string,
        questions: QuestionTestResultType[]
    },
    setQuizTestResult: (quizTestResult: {
        quizId: string
        quizTestId: string,
        questions: QuestionTestResultType[]
    }) => void,
    clearQuizTestResult: () => void,
}

export const useQuizTestStore = create<QuizTestStore>()(
    persist((set) => ({
            quizId: "",
            setQuizId: (quizId: string) => set({quizId: quizId}),
            questionsInQuizTest: [],
            setUserQuizTest: (questionsInQuizTest: QuestionEvaluationType[]) => set({questionsInQuizTest}),
            clearUserQuizTest: () => set({questionsInQuizTest: []}),
            handleAnswerChange: (questionId: string, answer: string, questionType: QuestionType) => set(
                (state) => {
                    const index = state.questionsInQuizTest.findIndex((item) => item.questionId === questionId);
                    if (index === -1) {
                        state.questionsInQuizTest.push({
                            questionId,
                            userAnswer: [answer],
                            questionType
                        });
                    } else {
                        if (questionType == QuestionType.MULTIPLE_CHOICE) {
                            if (!(state.questionsInQuizTest[index].userAnswer as string[]).includes(answer)) {
                                (state.questionsInQuizTest[index].userAnswer as string[]).push(answer);
                            } else {
                                // if answer already exists, remove it
                                state.questionsInQuizTest[index].userAnswer = (state.questionsInQuizTest[index].userAnswer as string[]).filter((item) => item !== answer);
                            }
                        } else if (questionType == QuestionType.TRUE_FALSE || questionType == QuestionType.SHORT_ANSWER) {
                            state.questionsInQuizTest[index].userAnswer = [answer];
                        }
                    }
                    return state;
                }
            )
        }),
        {
            name: "user-quiz-test",
        }
    ))
;

export const useQuizTestResultStore = create<QuizTestResultStore>()(
    persist((set) => ({
        quizTestResult: {quizId: "", questions: [], quizTestId: ""},
        setQuizTestResult: (quizTestResult: {
            quizId: string,
            questions: QuestionTestResultType[]
            quizTestId: string
        }) => {
            return set({quizTestResult});
        },
        clearQuizTestResult: () => set({
            quizTestResult: {
                quizId: "",
                questions: [],
                quizTestId: ""
            }
        }),
    }), {
        name: "quiz-test-result"
    }));