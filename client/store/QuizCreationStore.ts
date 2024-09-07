import {QuizCreationOptionType} from "@/config/QuizCreationTabsConfig";
import {create} from "zustand";
import {persist} from "zustand/middleware";
import {LocalQuestion, Question} from "@/types/QuizTypes/Question";
import {MultipleChoiceQuestion} from "@/types/QuizTypes/MultipleChoiceQuestion";
import React, {createRef} from "react";

interface QuizCreationStore {
    questionCount: number
    quizGenerating: boolean,
    setQuizGenerating: (value: boolean) => void,
    questions: Question[],
    loadQuestion: (question: Question) => void
    modifyQuestion: (question: Question) => void,
    removeQuestion: (questionId: string) => void
    removeAllQuestions: () => void
}

export const useQuizCreationStore = create<QuizCreationStore>()(
    persist(
        (set) => ({
            questionCount: 0,
            quizGenerating: false,
            setQuizGenerating: (value) => set({quizGenerating: value}),
            questions: Array<Question>(),
            modifyQuestion: (question) => set((state) => {
                return {
                    questions: state.questions.map((q) => {
                        if (q.questionId === question.questionId) {
                            return question;
                        }
                        return q;
                    })
                }
            }),
            loadQuestion: (question) => set((state) => {
                question.questionId = state.questionCount.toString();
                if (question.questionType === "MULTIPLE_CHOICE") {
                    (question as MultipleChoiceQuestion).options = (question as MultipleChoiceQuestion).options.map((option, index) => {
                        option.optionId = index.toString();
                        return option;
                    });
                }
                state.questionCount += 1;
                return {
                    questions: [...state.questions, question]
                }
            }),
            removeAllQuestions: () => set({questions: []}),
            removeQuestion: (questionId: string) => set((state) => {
                return {
                    questions: state.questions.filter((question) => question.questionId !== questionId)
                }
            }),
        }),
        {
            name: "quiz-creation-store"
        }
    )
);