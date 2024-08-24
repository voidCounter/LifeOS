import {create} from "zustand";

type QuizLearningStore = {
    currentlyLearningQuestion: string,
    revealAnswer: boolean,
    setCurrentlyLearningQuestion: (quizId: string) => void
    setRevealAnswer: (value?: boolean) => void
}
export const  useQuizLearningStore= create<QuizLearningStore>((set) => ({
    currentlyLearningQuestion: "",
    revealAnswer: false,
    setCurrentlyLearningQuestion: (quizId) => {
        set((state) => ({currentlyLearningQuestion: quizId}))
    },
    setRevealAnswer: (value?: boolean) => {
        set((state) => {
            if (value !== undefined) {
                return ({revealAnswer: value});
            }
            return ({revealAnswer: !state.revealAnswer});
        });
    }
}));