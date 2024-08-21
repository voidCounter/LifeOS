import {create} from "zustand";
import {Question} from "@/types/QuizTypes/Question";
import {QuizMode} from "@/types/QuizTypes/QuizMode";

interface QuizState {
    questions: Question[],
    modes: { [key: string]: QuizMode },
    toggleMode: (questionId: string) => void;
    deleteQuestion: (questionId: string) => void;
    updateQuestion: (updatedQuestion: Question) => void;
}

const useQuiz = create<QuizState>((set) => ({
    questions: [],
    modes: {},
    toggleMode: (questionId: string) => {
        set((state) => {
            state.modes[questionId] = state.modes[questionId] === "View" ? "Edit" : "View";
            return state;
        });
    },
    deleteQuestion: (questionId: string) => {
        set((state) => {
            state.questions = state.questions.filter((question) => question.questionId !== questionId);
            return state;
        });
    },
    updateQuestion: (updatedQuestion: Question) => {
        set((state) => {
            state.questions = state.questions.map((question) => {
                if (question.questionId === updatedQuestion.questionId) {
                    return updatedQuestion;
                }
                return question;
            });
            return state;
        });
    }
}));