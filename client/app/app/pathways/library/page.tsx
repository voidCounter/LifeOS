"use client";

import SectionHeader from "@/components/SectionHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchandCreate from "../components/SearchandCreate";
import { Button } from "@/components/ui/button";
import { SimpleStageDTO, StageType } from "@/types/PathwayTypes/Pathway";
import { useQuery } from "@tanstack/react-query";
import { fetchPathwayByUserId } from "@/api-handlers/pathway";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, MoreVerticalIcon, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useErrorNotification } from "@/hooks/useErrorNotification";
import GeneralLoading from "../components/StageLoading";
import GeneralError from "../components/GeneralError";
import { MoreActions } from "../components/MoreActions";
import { useRoadmapStore } from "@/store/PathwayStore/RoadmapStore";
import { useRouter } from "next/navigation";

export default function Library() {
    return (
        <main className="flex w-full justify-center self-center">
            <div className="flex flex-col gap-8 w-full">
                <div className="flex flex-col gap-4">
                    <SearchandCreate />
                    <section className="w-full items-center">
                        <SectionHeader title={"Your Library"} description={""} />
                        <Tabs
                            defaultValue="my_roadmaps"
                            className="w-full mt-4"
                        >
                            <TabsList
                                className={"lg:w-full"
                                    + "grid sticky top-0" +
                                    "z-50 grid-cols-3"
                                }
                            >
                                <TabsTrigger value="my_roadmaps" className="px-8">
                                    My Roadmaps
                                </TabsTrigger>
                                <TabsTrigger value="saved_roadmaps" className="px-8">
                                    Saved Roadmaps
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="my_roadmaps" className="self-center">
                                <MyRoadmaps />
                            </TabsContent>

                        </Tabs>
                    </section>
                </div>
            </div>
        </main>
    );
}

const MyRoadmaps = () => {

    const setRoadmaps = useRoadmapStore((state) => state.setRoadmaps);
    const roadmaps = useRoadmapStore((state) => state.roadmaps);

    const router = useRouter();

    const {
        isLoading: roadmapLoading,
        data: fetchedRoadmaps,
        isError: isRoadmapsError,
        error: roadmapsError
    } = useQuery<SimpleStageDTO[], Error>({
        queryKey: ['languages'],
        queryFn: fetchPathwayByUserId,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    useErrorNotification({
        isError: isRoadmapsError,
        title: "Error getting roadmaps",
        description: roadmapsError?.message + ""
    })

    if (roadmapLoading) {
        return (
            <GeneralLoading
                message="Loading roadmaps..."
            />
        )
    }

    if (fetchedRoadmaps === undefined) {
        return (
            <GeneralError
                message="Error loading roadmaps"
            />
        )
    }
    setRoadmaps(fetchedRoadmaps);

    return (
        <div className="flex flex-col gap-y-4 w-full mt-8">
            {
                roadmaps ? roadmaps.map((roadmap, index) => (
                    <Button 
                        variant={"ghost"} 
                        className=" flex items-start justify-start w-7/12 h-[110px]" 
                        key={index}
                        onClick={() => {
                            
                            router.push(`/app/pathways/explore/${roadmap.stageId}`);
                        }}    
                    >
                        <div className='flex flex-col gap-y-1 w-full items-start'>
                            <div className='flex flex-row items-center justify-between w-full'>
                                <div className='p-1 shadow-inner shadow-muted w-fit rounded-lg self-start'>
                                    <p className='text-muted-foreground text-[10px]'>
                                        {roadmap.isPublished ? "Public" : "Private"}
                                    </p>
                                </div>
                                <MoreActions
                                    stageId={roadmap.stageId}
                                    stageType={StageType.ROADMAP}
                                />
                            </div>
                            <h2 className={`font-semibold text-lg text-black`} >{roadmap.title}</h2>

                        </div>
                    </Button> 
                )) : null
            }
        </div>
    )
}

