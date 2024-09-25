"use client";

import { fetchStageById, fetchSubStageCount, generateOrFetchTask, generateSubStageByName, togglePublishRoadmap } from '@/api-handlers/pathway'
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup,  CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent,  DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useErrorNotification } from '@/hooks/useErrorNotification'
import { cn } from '@/lib/utils';
import { usePathwayPromptStore } from '@/store/PathwayPromptStore';
import { useStageStore } from '@/store/StageStore';
import { PublishDTO, Stage, StageType, SubStageCountDTO } from '@/types/PathwayTypes/Pathway'
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query'
import { 
    BookOpenCheck, 
    Check,  
    ChevronsUpDown, 
    Component, 
    Edit, 
    FolderGit2, 
    Goal, 
    ListTodo, 
    LoaderCircle, 
    LucideCheckSquare, 
    Milestone, 
    MoreVerticalIcon, 
    Pencil, 
    PencilRuler, 
    PlusIcon, 
    SparklesIcon, 
    Trash 
} from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { MDXRemote } from 'next-mdx-remote/rsc'
import GeneralLoading from '@/app/app/pathways/components/StageLoading';
import GeneralError from '../../components/GeneralError';
import { MoreActions } from '../../components/MoreActions';


const StageView = ({ params }: { params: { stageId: string } }) => {

    const router = useRouter();

    const prompt = usePathwayPromptStore(state => state.prompt);
    const setPrompt = usePathwayPromptStore(state => state.setPrompt);
    const language = usePathwayPromptStore(state => state.language);

    const setParentStage = useStageStore(state => state.setStage);
    const stage = useStageStore(state => state.stage);


    const setChildStageType = (): StageType => {
        if (parentStage === undefined) return StageType.MILESTONE;
        const {
            title, description
        } = parentStage;
        setPrompt(JSON.stringify({ title, description }))
        if (parentStage.type === StageType.ROADMAP) {
            return StageType.MILESTONE
        }
        if (parentStage.type === StageType.MILESTONE) {
            return StageType.MODULE
        }

        return StageType.TASK


    }



    const {
        data: parentStage,
        isLoading: isStageLoading,
        isError: isStageError,
        error: stageError
    } = useQuery<Stage, Error>({
        queryKey: ['stage', params.stageId],
        queryFn: () => fetchStageById({
            parentId: params.stageId,
            context: prompt,
            language: language,
            type: setChildStageType()
        }),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })





    useErrorNotification({
        isError: isStageError,
        title: "Error loading the stage ",
        description: stageError?.message ?? "",
    })


    useEffect(() => {
        if (parentStage) {
            setParentStage(parentStage);

        }
    }, [parentStage])

    if (isStageLoading)
        return (
            <GeneralLoading 
                message='Loading stage...'
            />
        );

    if (stage === undefined) 
        return (
            <GeneralError 
                message='Error getting stage'
            />
        );



    const RenderSubStages = () => {


        const {
            subStages
        } = stage;

        if (subStages == null) return <div>Error loading substage</div>;



        return (
            <div className='flex flex-row gap-x-2 w-full items-center'>
                <div className='flex flex-col gap-0'>
                    {
                        subStages.map((subStage, index) => (
                            <div className='flex flex-col items-center justify-center' key={index}>
                                <div className='flex p-2 rounded-full border border-muted shadow-sm shadow-black'>
                                    <RenderIcon
                                        type={subStage.type}
                                    />
                                </div>
                                {
                                    subStages.length - 1 !== index ?
                                        <div className='items-center justify-center'>
                                            <svg width="50" height="100" >
                                                <line
                                                    x1="25"
                                                    y1="0"
                                                    x2="25"
                                                    y2="100"
                                                    stroke="black"
                                                    strokeWidth="1"
                                                    strokeDasharray="5,5"
                                                />
                                            </svg>
                                        </div> : null}
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-col gap-y-8 w-full items-center'>
                    {
                        subStages.map((subStage, index) => (
                            <Button key={index} variant='ghost' className='text-black flex flex-col items-start p-4 rounded-xl shadow-sm shadow-black w-full h-[110px] overflow-clip'
                                onClick={() => {
                                    setParentStage(subStage);
                                    router.push(`/app/pathways/explore/${subStage.stageId}`)
                                }}
                            >
                                <div className='flex flex-row w-full justify-between items-center'>
                                    <div className='p-1 shadow-inner shadow-muted w-fit rounded-lg self-start'>
                                        <p className='text-muted-foreground text-[10px]'>
                                            {subStage.type}
                                        </p>
                                    </div>
                                    <MoreActions
                                        stageId={subStage.stageId}
                                        stageType={subStage.type}
                                    />
                                </div>

                                <div className='w-fit'>
                                    <h1 className='font-semibold text-base text-black'>{subStage.title}</h1>
                                </div>

                                <div className='flex flex-row w-full justify-between items-center'>
                                    <Stages
                                        stage={subStage}
                                    />
                                </div>
                            </Button>
                        ))
                    }
                </div>
            </div>
        )
    }

    const RenderTaskContent = () => {

        const addContent = useStageStore(state => state.addContent);

        const {
            data: content,
            isLoading: isContentLoading,
            isError: isContentError,
            error: contentError
        } = useQuery<string, Error>({
                queryKey: ['content', stage.stageId],
            queryFn: () => generateOrFetchTask({
                title: stage.title,
                description: stage.description,
                context: " ",
                stageId: stage.stageId
            }),
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        })

        useErrorNotification({
            isError: isContentError,
            title: "Error loading task content",
            description: contentError?.message ?? "",
        })

        if (stage.content) {
            return (
                <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-black">
                    <MDXRemote source={stage.content} />
                </div>
            )
        }



        if (isContentLoading) return <GeneralLoading message='Loading task content...' />;

        if (content === undefined) return <GeneralError message='Error loading task content' />;

        addContent(content);

        return (
            <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-black">
                <MDXRemote source={"# Hello"} />
            </div>
        )
    }




    return (

        <div className='min-h-full flex flex-col items-start gap-y-8 mt-2 w-3/4'>
            <div className='flex flex-col w-full bg-muted rounded-xl p-8 items-center gap-y-4'>
                <div className='flex flex-row w-full items-center gap-4 '>
                    <div className='flex rounded-full bg-white border border-muted p-2'>
                        <RenderIcon 
                            type={stage.type}
                        />
                    </div>
                    <div className='flex flex-col gap-y-1 w-full'>
                        <div className='flex flex-row items-center justify-between w-full'>
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
                        <h2 className={`font-semibold text-lg text-black `} >{stage.title}</h2>
                        {stage.type !== StageType.TASK ?
                            <p className={`font-normal text-base text-muted-foreground`}>{stage.description}</p> : null
                        }
                    </div>

                </div>
            </div>

            {stage.type !== StageType.TASK ?
                <RenderSubStages /> :
                <RenderTaskContent />
            }

            <AddNewStage
                stage={stage}
            />
            <div className='mt-96' />
        </div>
    )
}


const RenderIcon = ({
    type
}: {
    type: StageType
}) => {
    if (type === StageType.ROADMAP) {
        <Goal size={24} className='text-black' />
    }
    if (type === StageType.QUIZ) {
        return <BookOpenCheck size={24} className='text-black' />
    }
    if (type === StageType.MILESTONE) {
        return <Milestone size={24} className='text-black' />
    }
    if (type === StageType.MODULE) {
        return <PencilRuler size={24} className='text-black' />
    }
    if (type === StageType.PROJECT) {
        return <FolderGit2 size={24} className='text-black' />
    }
    return (
        <Component size={24} className='text-black' />
    )
}



const Stages = ({
    stage
}: {
    stage: Stage
}) => {

    const {
        type: stageType,
        stageId
    } = stage;

    const {
        data: noOfSubStages,
        isLoading: isSubStagesLoading,
        isError: isSubStagesError,
        error: subStagesError
    } = useQuery<SubStageCountDTO, Error>({
        queryKey: ['subStages', stageId],
        queryFn: () => fetchSubStageCount(stageId),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    useErrorNotification({
        isError: isSubStagesError,
        title: "Error loading substage count",
        description: subStagesError?.message ?? "",
    });


    if (stageType === StageType.QUIZ) {
        return null;
    }



    if (stageType === StageType.TASK) {
        if (stage.content) {
            return (
                <div className='flex flex-row gap-2 items-center mt-1'>
                    <LucideCheckSquare size={18} className='text-muted-foreground' />
                    <p className='text-sm line-clamp-1 text-muted-foreground'>
                        Generated
                    </p>
                </div>
            )
        } else {
            return (
                <div className='flex flex-row gap-2 items-center mt-1'>
                    <Pencil size={16} className='text-muted-foreground' />
                    <p className='text-sm line-clamp-1 text-muted-foreground'>
                        Not generated
                    </p>
                </div>
            )
        }
    }




    return (
        <div className='flex flex-row gap-2 items-center'>
            {isSubStagesLoading ? <div className={"flex justify-center items-center"}>
                <LoaderCircle className={"animate-spin mr-2"}
                    strokeWidth={1} />
                Counting Stages...
            </div> : noOfSubStages?.noOfSubStages ?
                <ListTodo size={18} className='text-muted-foreground' />
                : <Pencil size={16} className='text-muted-foreground' />
            }
            <p className='text-sm line-clamp-1 text-muted-foreground'>
                {
                    noOfSubStages?.noOfSubStages ? noOfSubStages.noOfSubStages + " stages" : "no substages yet."
                }
            </p>
        </div>
    )
}



const AddNewStage = ({
    stage
}: {
    stage: Stage
}) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const language = usePathwayPromptStore(state => state.language);
    const addSubStages = useStageStore(state => state.addSubStages);


    const {
        type: stageType,
        stageId
    } = stage;

    let subStageSchema
    let stages: {
        label: string;
        value: StageType;
    }[] = []
    if (stageType === StageType.ROADMAP) {
        subStageSchema = z.enum([StageType.MILESTONE, StageType.PROJECT]);
        stages.push({ label: "Milestone", value: StageType.MILESTONE });
        stages.push({ label: "Project", value: StageType.PROJECT });
    } else if (stageType === StageType.MILESTONE) {
        subStageSchema = z.enum([StageType.MODULE, StageType.QUIZ])
        stages.push({ label: "Module", value: StageType.MODULE });
        stages.push({ label: "Quiz", value: StageType.QUIZ });
    } else {
        subStageSchema = z.enum([StageType.TASK])
        stages.push({ label: "Task", value: StageType.TASK });
    }
    const FormSchema = z.object({
        subStage: subStageSchema,
        prompt: z.string().min(5).max(100),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    if (stage.type === StageType.TASK) return null;






    const getContext = (prompt: string): string => {
        const {
            title, description, subStages
        } = stage;
        let contextObj: {
            title: string;
            description: string;
            type: StageType;
            subStages: {
                title: string;
                description: string;
                type: StageType;
            }[]
        } = {
            title: title,
            description: description,
            type: stageType,
            subStages: []
        }
        if (subStages) {
            contextObj.subStages = subStages.map((subStage, index) => {
                return {
                    title: subStage.title,
                    description: subStage.description,
                    type: subStage.type
                }
            })
        }
        return JSON.stringify({ contextObj, prompt: prompt });
    }

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        setLoading(true);
        const {
            prompt,
            subStage
        } = data;
        const context = getContext(prompt);
        try {
            const stages = await generateSubStageByName({
                type: subStage,
                context: context,
                language,
                parentId: stageId
            })
            addSubStages(stages);
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }


    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"} className='self-center w-2/3 items-center justify-center'>
                    <div className='flex flex-row gap-2 items-center'>
                        <PlusIcon size={18} className='text-black' />
                        <p className='font-medium text-black text-base'>Add new child stage</p>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className=''>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="subStage"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Select Substage</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-[200px] justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? stages.find(
                                                            (stage) => stage.value === field.value
                                                        )?.label
                                                        : "Select substage"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandList>
                                                    <CommandEmpty>No stage(s) name found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {stages.map((stage) => (
                                                            <CommandItem
                                                                value={stage.label}
                                                                key={stage.value}
                                                                onSelect={() => {
                                                                    form.setValue("subStage", stage.value as StageType.MILESTONE || StageType.MODULE || StageType.TASK || StageType.PROJECT)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        stage.value === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                {stage.label}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="prompt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prompt</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us what you want"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        You can add additional prompt here
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={loading} className='w-fit' >
                            {!loading ?
                                <div className='flex flex-row gap-1 items-center px-4'>
                                    <SparklesIcon size={18} className='text-white' />
                                    <p className='font-medium text-white text-base'>Generate</p>
                                </div> : <div className={"flex justify-center items-center"}>
                                    <LoaderCircle className={"animate-spin mr-2"}
                                        strokeWidth={1} />
                                    Generating stage...
                                </div>
                            }
                        </Button>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}



export default StageView



