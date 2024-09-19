import { GeneratedQuestion, PathwayPromptType } from "@/types/PathwayTypes";
import { create } from "zustand";
import {persist} from "zustand/middleware";

interface PathwayQuestionStore {
    questions: GeneratedQuestion[], 
    addQuestions: (questions: GeneratedQuestion[]) => void,
}

export const usePathwayQuestionStore = create<PathwayQuestionStore>()(
    persist(
        (set) => ({
            questions: Array<GeneratedQuestion>(),
            addQuestions: (questions : GeneratedQuestion[]) => set((state) => ({questions: [...state.questions, ...questions]}))
        }), 
        {
            name: "pathway-questions"
        }
    ) 
    
)

type PathwayPromptTypeStore = PathwayPromptType & {
    setPrompt: (prompt: string) => void,
    setLanguage: (language: string) => void
}

export const usePathwayPromptStore = create<PathwayPromptTypeStore>((set) => ({
    prompt: "",
    language: "English", 
    setPrompt: (prompt : string) => set({prompt}),
    setLanguage: (language: string) => set({language})
}))