"use client"; 

import {  getRoadmapPublishStatus, togglePublishRoadmap } from '@/api-handlers/pathway'
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { useErrorNotification } from '@/hooks/useErrorNotification';
import { useRoadmapStore } from '@/store/PathwayStore/RoadmapStore';
import { PublishDTO, Stage, StageType } from '@/types/PathwayTypes/Pathway'
import { useQuery } from '@tanstack/react-query'
import { 
    Edit, 
    MoreVerticalIcon, 
    Trash 
} from 'lucide-react'
import React, {  useEffect, useState } from 'react'
import GeneralLoading from './StageLoading';
import GeneralError from './GeneralError';


export const MoreActions = ({
    stageId,
    stageType
}: {
    stageId: string;
    stageType: StageType
}) => {
    const setPublished = useRoadmapStore((state) => state.setPublished);
    const getPusblished = useRoadmapStore((state) => state.getPublished);
    const [checked, setChecked] = useState(getPusblished(stageId));

    const {
        data: roadmapStatus,
        isLoading: isRoadmapStatusLoading,
        isError: isRoadmapStatusError,
        error: roadmapStatusError,
    } = useQuery<PublishDTO, Error>({
        queryKey: ['roadmapStatus', stageId],
        queryFn: () => getRoadmapPublishStatus(stageId),
        enabled: stageType === StageType.ROADMAP,
        refetchOnMount: false,
        refetchOnWindowFocus: false,

    });

    useErrorNotification({
        isError: isRoadmapStatusError,
        title: "Error fetching roadmap status",
        description: roadmapStatusError?.message ?? "Error fetching roadmap status"
    })
    


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="link" size="sm" className='h-6'>
                    <div className='flex'>
                        <MoreVerticalIcon size={18} className='text-black bg-transparent hover:bg-muted rounded-full' />
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32" onBlur={() => {console.log("Blur");
            }}>
                <DropdownMenuGroup>
                    <DropdownMenuItem className='flex flex-row w-full justify-between items-center'>
                        <span className='text-red-700'>Delete</span>
                        <Trash className="mr-2 h-4 w-4 text-red-700" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className='flex flex-row w-full justify-between items-center'>
                        <span>Update</span>
                        <Edit className="mr-2 h-4 w-4" />
                    </DropdownMenuItem>
                    {
                        stageType === StageType.ROADMAP ?
                            <DropdownMenuItem className='flex flex-row w-full justify-between items-center'>
                                <span>
                                    Public
                                </span>
                                <Switch
                                    checked={checked}
                                    disabled={isRoadmapStatusLoading}
                                    onCheckedChange={(checked) => {
                                        setChecked(checked);
                                        togglePublishRoadmap(stageId, checked);
                                        setPublished(stageId, checked);
                                    }}
                                />
                            </DropdownMenuItem>
                            : null
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
