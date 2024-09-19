import { Stage, StageType } from "@/types/PathwayTypes/Pathway";
import {create} from "zustand";

interface StageStore {
    stages: Stage[]
    setStages: (stages: Stage[]) => void,
    addStages: (stages: Stage[]) => void, 
    removeStage: (stage : Stage) => void
}

export const useStageStore = create<StageStore>((set) => ({
    stages: [],
    setStages: (stages) => set({stages}), 
    addStages: (stages) => set((state) => ({stages: [...state.stages, ...stages]})), 
    removeStage: (stage) => set((state) => ({stages: state.stages.filter((s) => s.stageId !== stage.stageId)}))
}))