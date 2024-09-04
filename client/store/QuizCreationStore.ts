import {QuizCreationOptionType} from "@/config/QuizCreationTabsConfig";
import {create} from "zustand";
import {persist} from "zustand/middleware";
import {Question} from "@/types/QuizTypes/Question";

interface QuizCreationStore {
    quizGenerating: boolean,
    setQuizGenerating: (value: boolean) => void,
    currentOption: QuizCreationOptionType,
    setCurrentOption: (option: QuizCreationOptionType) => void
    questions: Question[],
    addQuestion: (question: Question) => void
    removeQuestion: (index: number) => void
    removeAllQuestions: () => void
}

export const useQuizCreationStore = create<QuizCreationStore>()(
    persist(
        (set) => ({
            quizGenerating: false,
            setQuizGenerating: (value) => set({quizGenerating: value}),
            currentOption: "prompt",
            questions: Array<Question>(),
            addQuestion: (question) => set((state) => {
                return {
                    questions: [...state.questions, question]
                }
            }),
            removeAllQuestions: () => set({questions: []}),
            removeQuestion: (index) => set((state) => {
                return {
                    questions: state.questions.filter((_, i) => i !== index)
                }
            }),
            setCurrentOption: (option) => set({currentOption: option})
        }),
        {
            name: "quiz-creation-store"
        }
    )
);