import {create} from "zustand";
import {persist} from "zustand/middleware";

interface SelectedTextStore {
    selectedText: string;
    setSelectedText: (selectedText: string) => void;
}

export const useSelectedTextStore = create<SelectedTextStore>() (
    persist(
        (set) => ({
            selectedText: '',
            setSelectedText: (selectedText: string) => set({ selectedText }),
        })
        , {
            name: "selected-text-store"
        })
);