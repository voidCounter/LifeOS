"use client";

import SectionHeader from "@/components/SectionHeader";
import { PathwayInputForm } from "../components/PathwayInputForm";
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
import { Progress } from "@/components/ui/progress";
import { useErrorNotification } from "@/hooks/useErrorNotification";

export default function Library() {
    return (
        <main className="flex w-full justify-center">
            <div className="flex flex-col gap-8 w-full max-w-[800px]">
                <div className="flex flex-col gap-4">
                    <SearchandCreate />
                    <section className="w-full">
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
                            <TabsContent value="my_roadmaps">
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

    const {
        isLoading: roadmapLoading,
        data: roadmaps,
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
        return <p>Loading...</p>
    }


    return (
        <div className="flex flex-col gap-y-4 w-full mt-8">
            {
                roadmaps ? roadmaps.map((roadmap, index) => (
                    <Button variant={"ghost"} className=" flex items-start justify-start h-auto w-7/12" key={index}>
                        <div className='flex flex-col gap-y-1 w-full items-start'>
                            <div className='flex flex-row items-center justify-between w-full'>
                                <div className='p-1 shadow-inner shadow-muted w-fit rounded-lg self-start'>
                                    <p className='text-muted-foreground text-[10px]'>
                                        {roadmap.status ? "Public" : "Private"}
                                    </p>
                                </div>
                                <MoreActions
                                    stageId={roadmap.stageId}
                                    stageType={StageType.ROADMAP}
                                />
                            </div>
                            <h2 className={`font-semibold text-lg text-black`} >{roadmap.title}</h2>
                            <ProgressComp
                                noOfTotalStages={roadmap.noOfTotalStage}
                                noOfCompletedStages={roadmap.noOfCompletedStage}
                                stageType={StageType.ROADMAP}
                            />
                        </div>
                    </Button>
                )) : <div>No roadmaps loaded</div>
            }
        </div>
    )
}

const ProgressComp = ({ noOfTotalStages, noOfCompletedStages, stageType }: { noOfTotalStages: number; noOfCompletedStages: number; stageType: StageType }) => {

    const progress = (noOfCompletedStages / noOfTotalStages) * 100;

    

    return (
        <div className='w-full flex flex-row gap-1 items-center pl-4'>
            <Progress value={progress} className="w-[85%] mr-6 h-3 bg-gray-200 " /> {/* todo: */}
            <p className='text-muted-foreground text-base'>{progress.toFixed(1)}%</p>
        </div>
    )
}

const MoreActions = ({
    stageId,
    stageType
}: {
    stageId: string;
    stageType?: StageType
}) => {
    const [isPublic, setIsPublic] = useState(false)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="link" size="sm" className='h-6'>
                    <div className='flex'>
                        <MoreVerticalIcon size={18} className='text-black bg-transparent hover:bg-muted rounded-full' />
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32">
                <DropdownMenuGroup>
                    <DropdownMenuItem className='flex flex-row w-full justify-between items-center'>
                        <span>Delete</span>
                        <Trash className="mr-2 h-4 w-4" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className='flex flex-row w-full justify-between items-center'>
                        <span>Update</span>
                        <Edit className="mr-2 h-4 w-4" />
                    </DropdownMenuItem>
                    {
                        stageType === StageType.ROADMAP ?
                            <DropdownMenuItem className='flex flex-row w-full justify-between items-center'>
                                <span>Public</span>
                                <Switch checked={isPublic} onCheckedChange={setIsPublic} />
                            </DropdownMenuItem>
                            : null
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}