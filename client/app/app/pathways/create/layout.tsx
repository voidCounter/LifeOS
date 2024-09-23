import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { pathwayCreationOptions, PathwayCreationType } from '@/types/PathwayTypes/PathwayCreationType'
import Link from 'next/link'
import React from 'react'

const PathwayCreationLayout = ({children}: {
    children: React.ReactNode
}) => {
  return (
    <div className='flex flex-col gap-y-8 w-full h-full'>
        <PathwayCreationTab />
        {children}
    </div>
  )
}

const PathwayCreationTab = () => {


    return (
        <Tabs defaultValue={PathwayCreationType.PROMPT} className='mt-4'>
            <TabsList className='h-auto items-center justify-center p-2'>
                {pathwayCreationOptions.map((tab, index) => (
                    <TabsTrigger key={index} value={tab.tabName} className=''>
                        <Link 
                            href={`/app/pathways/create/${tab.tabName.toLowerCase()}`}
                            className='w-16'
                        >
                            <div className='flex items-center justify-center flex-col gap-2 p-2 '>
                                <tab.tabIcon />
                                <p className='capitalize font-semibold'>
                                    {tab.tabName}
                                </p>
                            </div>
                        </Link>
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}

export default PathwayCreationLayout