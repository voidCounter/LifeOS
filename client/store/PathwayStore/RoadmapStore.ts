import { SimpleStageDTO } from "@/types/PathwayTypes/Pathway";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RoadmapStore {
    roadmaps: SimpleStageDTO[];
    setRoadmaps: (roadmaps: SimpleStageDTO[]) => void;
    setPublished: (stageId: string, isPublished: boolean) => void;
    getPublished: (stageId: string) => boolean;
}

export const useRoadmapStore = create<RoadmapStore>()(
    persist(
        (set, get) => ({
            roadmaps: new Array<SimpleStageDTO>(),
            setRoadmaps: (roadmaps: SimpleStageDTO[]) => set({ roadmaps: roadmaps }),
            setPublished: (stageId: string, isPublished: boolean) => set((state) => ({
                roadmaps: state.roadmaps.map((roadmap) => {
                    if (roadmap.stageId === stageId) {
                        return {
                            ...roadmap,
                            isPublished: isPublished
                        }
                    }
                    return roadmap;
                })
            })
            ),
            getPublished: (stageId: string): boolean => {
                const roadmap = get().roadmaps.find((roadmap) => roadmap.stageId === stageId);
                return roadmap ? roadmap.isPublished : false; 
            }
            }),
        {
            name: "roadmap-store"
        }
    )
)