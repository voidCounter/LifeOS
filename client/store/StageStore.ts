import { Stage } from '@/types/PathwayTypes/Pathway';
import {create} from 'zustand';

interface StageStore {
    stage: Stage | undefined; 
    setStage: (stage: Stage) => void;
}

export const useStageStore = create<StageStore>((set) => ({
    stage: undefined, 
    setStage: (stage: Stage) => set({stage})
}))