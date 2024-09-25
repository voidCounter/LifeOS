import { create } from "zustand";
import { persist } from "zustand/middleware";

type PathwayPromptTypeStore ={
    prompt: string,
    language: string,
    setPrompt: (prompt: string) => void,
    setLanguage: (language: string) => void
}

export const usePathwayPromptStore = create<PathwayPromptTypeStore>()(
    persist(
        (set) => ({
            prompt: "",
            language: "English", 
            setPrompt: (prompt : string) => set({prompt : prompt}),
            setLanguage: (language: string) => set({language : language})
        }), 
        {
            name: "pathway-prompt-store"
        }
    )
)