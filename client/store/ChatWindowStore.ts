import { create } from "zustand";

interface ChatWindowStore {
    open: boolean,
    toggleOpen: (open: boolean) => void,
}

export const useChatWindowStore = create<ChatWindowStore>(set => ({
    open: false,
    toggleOpen: (open) => set({open})
}))