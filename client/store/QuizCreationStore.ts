import {QuizCreationOptionType} from "@/config/QuizCreationTabsConfig";
import {create} from "zustand";
import {persist} from "zustand/middleware";

interface QuizCreationStore {
    currentOption: QuizCreationOptionType,
    setCurrentOption: (option: QuizCreationOptionType) => void
}

export const useQuizCreationStore = create<QuizCreationStore>()(
    persist(
        (set) => ({
            currentOption: "prompt",
            setCurrentOption: (option) => set({currentOption: option})
        }),
        {
            name: "quiz-creation-store"
        }
    )
);