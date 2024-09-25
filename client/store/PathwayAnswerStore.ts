import { create } from "zustand";
import { persist } from "zustand/middleware";

type AnswersStore = {
    answers: Map<string, string>;
    addAnswer: (key: string, answer: string[]) => void;
    getAnswer: (key: string) => string[] | undefined;
};

export const usePathwayAnswerStore = create<AnswersStore>((set, get) => ({
    answers: new Map<string, string>(), 
    addAnswer: (key, answer) => {
      const serializedAnswer = JSON.stringify(answer);
      set((state) => {
        const newAnswers = new Map(state.answers); 
        newAnswers.set(key, serializedAnswer);
        return { answers: newAnswers }; 
      });
    },
    getAnswer: (key) => {
      const answer = get().answers.get(key); 
      return answer ? JSON.parse(answer) : undefined; 
    },
  }));