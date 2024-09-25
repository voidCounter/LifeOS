import { Stage } from '@/types/PathwayTypes/Pathway';
import {create} from 'zustand';
import { persist } from 'zustand/middleware';

interface StageStore {
    stage: Stage | undefined; 
    setStage: (stage: Stage) => void;
    addSubStages: (subStage: Stage[]) => void;
    addContent: (content: string) => void;
}

export const useStageStore = create<StageStore>() (
    persist(
        (set) => ({
            stage: undefined, 
            setStage: (stage: Stage) => set({stage}), 
            addSubStages: (subStages: Stage[]) => set((state) => ({
                stage: {
                    ...state.stage!,
                    subStages: [...(state.stage?.subStages || []), ...subStages]
                }
            })), 
            addContent: (content: string) => set((state) => ({
                stage: {
                    ...state.stage!,
                    content
                }
            }))
        }), 
        {
            name: "stage-store"
        }
    )
)