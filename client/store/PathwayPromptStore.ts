import { create } from "zustand";

type PathwayPromptTypeStore ={
    prompt: string,
    language: string,
    setPrompt: (prompt: string) => void,
    setLanguage: (language: string) => void
}

export const usePathwayPromptStore = create<PathwayPromptTypeStore>((set) => ({
    prompt: "",
    language: "English", 
    setPrompt: (prompt : string) => set({prompt}),
    setLanguage: (language: string) => set({language})
}))