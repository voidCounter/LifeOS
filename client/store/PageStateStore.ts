import {create} from "zustand";
import {persist} from "zustand/middleware";

interface PageStateProps {
    lastRoute: string
    setLastRoute: (route: string) => void
}

export const usePageStateStore = create<PageStateProps>()(
    persist(
        (set) => ({
            lastRoute: "",
            setLastRoute: (route) => set({lastRoute: route})
        }),
        {
            name: "page-state-storage"
        }
    )
)