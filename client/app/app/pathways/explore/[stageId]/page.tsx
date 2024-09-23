"use client";

import { fetchStageById, generateSubStage } from '@/api-handlers/pathway'
import { Button } from '@/components/ui/button';
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { useErrorNotification } from '@/hooks/useErrorNotification'
import { usePathwayPromptStore } from '@/store/PathwayPromptStore';
import { Stage, StageType } from '@/types/PathwayTypes/Pathway'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { useQuery } from '@tanstack/react-query'
import { Component, Edit, Edit2, Goal, ListTodo, MoreVerticalIcon, Trash } from 'lucide-react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const StageView = ({ params }: { params: { stageId: string } }) => {

    const router = useRouter();
    const [childStage, setChildStage] = useState<StageType>(StageType.MILESTONE);

    const {
        data: stage,
        isLoading: isStageLoading,
        isError: isStageError,
        error: stageError
    } = useQuery<Stage, Error>({
        queryKey: ['stage', params.stageId],
        queryFn: () => fetchStageById(params.stageId),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })


    useErrorNotification({
        isError: isStageError,
        title: "Error loading the stage ",
        description: stageError?.message ?? "",
    })


    useEffect(() => {
        if (stage) {
            setChildStage(StageType.MILESTONE)
        }
    }, [stage])

    if (isStageLoading) return <div>Loading...</div>

    if (stage === undefined) return <div>Stage not found</div>;

    const prompt = usePathwayPromptStore(state => state.prompt);
    const language = usePathwayPromptStore(state => state.language);

    const context = {
        title: stage.title, 
        description: stage.description,
        prompt: prompt,
        lanuage: language
    }

    // const {
    //     data: subStages,
    //     isLoading: isSubStagesLoading,
    //     isError: isSubStagesError,
    //     error: subStagesError
    // } = useQuery<Stage[], Error>({
    //     queryKey: ['subStages', stage.stageId],
    //     queryFn: () => generateSubStage({
    //         type: childStage,
    //         context: JSON.stringify(context),
    //         language: "en",
    //         parentId: stage.stageId, 
            
    //     }), 
    //     refetchOnMount: false,
    //     refetchOnWindowFocus: false,
    // });


    // const renderSubStages = () => {
        
    //     if (isSubStagesLoading) return <div>Loading...</div>

    //     useErrorNotification({
    //         isError: isSubStagesError,
    //         title: "Error loading the sub stages ",
    //         description: subStagesError?.message ?? "",
    //     })

    //     if (subStages === undefined) return <div>Sub stages not found</div>;

    //     return (
    //         <div className='flex flex-row gap-x-2 items-center w-full'>
    //         <div className='flex flex-col gap-0'>
    //             {
    //                 subStages.map((subStage, index) => (
    //                     <div className='flex flex-col items-center justify-center'>
    //                         <div className='flex p-2 rounded-full border border-muted shadow-sm shadow-black'>
    //                             <Component size={24} /> {/* todo: random icon */}
    //                         </div>
    //                         {
    //                             subStages.length !== index - 1 ?
    //                                 <div className='items-center justify-center'>
    //                                     <svg width="50" height="100" >
    //                                         <line
    //                                             x1="25"
    //                                             y1="0"
    //                                             x2="25"
    //                                             y2="100"
    //                                             stroke="black"
    //                                             strokeWidth="1"
    //                                             strokeDasharray="5,5" // Creates the dashed effect
    //                                         />
    //                                     </svg>
    //                                 </div> : null}
    //                     </div>
    //                 ))
    //             }
    //             <div className='flex flex-col gap-y-8 w-full'>
    //                 {
    //                     subStages.map((subStage, index) => (
    //                         <Button key={index} variant='ghost' className='text-black flex flex-col items-start p-4 rounded-xl shadow-sm shadow-black min-w-full h-[120px] '
    //                             onClick={() => {
    //                                 router.push(`/app/pathways/explore/${subStage.stageId}`)
    //                             }}
    //                         >
    //                             <div className='flex flex-row w-full justify-between items-center'>
    //                                 <div className='p-1 shadow-inner shadow-muted w-fit rounded-lg self-start'>
    //                                     <p className='text-muted-foreground text-[10px]'>
    //                                         {subStage.type}
    //                                     </p>
    //                                 </div>
    //                                 <MoreActions
    //                                     stageId={subStage.stageId}
    //                                 />
    //                             </div>

    //                             <h1 className='font-semibold text-base text-black line-clamp-1'>{subStage.title}</h1>

    //                             <div className='flex flex-row w-full justify-between items-center'>
    //                                 <Stages
    //                                     stageType={subStage.type}
    //                                     noOfSubStages={subStages.length}
    //                                 />
    //                             </div>
    //                         </Button>
    //                     ))
    //                 }
    //             </div>
    //         </div>

    //     </div>
    //     )
    // }

    return (
        <div className='h-full flex flex-col items-start gap-y-8 mt-2 w-7/12'>
            <div className='flex flex-col w-full bg-muted rounded-xl p-8 items-center gap-y-4'>
                <div className='flex flex-row w-full items-center gap-4 '>
                    <div className='flex rounded-full bg-white border border-muted p-2'>
                        <Goal size={24} className='' />
                    </div>
                    <div className='flex flex-col gap-y-1'>
                        <div className='flex flex-row items-center justify-between'>
                            <div className='p-1 border border-muted-foreground w-fit rounded-lg'>
                                <p className='text-muted-foreground text-xs'>
                                    {stage.type}
                                </p>
                            </div>
                            <MoreActions
                                stageId={stage.stageId}
                                stageType={stage.type}
                            />
                        </div>
                        <h2 className={`font-semibold text-lg text-black`} >{stage.title}</h2>
                        <p className={`font-normal text-base text-muted-foreground`}>{stage.description}</p>
                    </div>
                </div>

            </div>
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

const Stages = ({
    stageType,
    noOfSubStages
}: {
    stageType: StageType,
    noOfSubStages: number
}) => {


    return (
        <div className='flex flex-row gap-2 items-center'>
            <ListTodo size={18} className='text-muted-foreground' />
            <p className='text-sm line-clamp-1 text-muted-foreground'>{noOfSubStages} Stages </p>
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
    // todo: implement update delete functionality
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





export default StageView



