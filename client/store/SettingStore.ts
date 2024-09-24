import {create} from "zustand";
import {persist} from "zustand/middleware";

interface SettingStore {
    isSidebarOpen: boolean,
    lastRoute: string,
    setSidebarOpen: (value: boolean) => void,
    setLastRoute: (value: string) => void
}

export const useSettingStore = create<SettingStore>()(
    persist((set) => ({
        isSidebarOpen: false,
        lastRoute: "",
        setSidebarOpen: (value: boolean) => {
            set({isSidebarOpen: value})
        },
        setLastRoute: (value: string) => {
            set({lastRoute: value})
        }
    }), {
        name: "setting-store"
    }));