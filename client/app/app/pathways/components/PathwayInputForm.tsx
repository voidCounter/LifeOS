"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Check, ChevronsUpDown, FileQuestion, Info, LoaderCircle, SparklesIcon } from "lucide-react"
import SectionHeader from "@/components/SectionHeader"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useQuery } from "@tanstack/react-query"
import { Language, Languages } from "@/types/Language"
import { fetchLanguages } from "@/api-handlers/language"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"

import { GeneratedQuestion, GeneratedQuestionType } from "@/types/PathwayTypes"
import { generateQuestionByPrompt } from "@/api-handlers/pathway"
import { usePathwayQuestionStore } from "@/store/PathwayQuestionStore"
import { useChatWindowStore } from "@/store/ChatWindowStore"
import { PathwayCreationType } from "@/types/PathwayTypes/PathwayCreationType"
import { pathwayCreationSchema } from "../create/[tab]/PathwayCreationSchema"
import { useState } from "react"
import { usePathwayPromptStore } from "@/store/PathwayPromptStore"





export function PathwayInputForm({ tab }: { tab: PathwayCreationType }) {
    const form = useForm<z.infer<typeof pathwayCreationSchema>>({
        resolver: zodResolver(pathwayCreationSchema),
    })

    form.setValue("creationMethod", tab.toUpperCase() as "PROMPT" | "FILE");

    const addQuestions = usePathwayQuestionStore((state) => state.addQuestions);
    const toggleOpen = useChatWindowStore((state) => state.toggleOpen);


    const GeneratedQuestionTypeSchema = z.enum([
        GeneratedQuestionType.OPEN_ENDED,
        GeneratedQuestionType.YES_NO,
        GeneratedQuestionType.MULTIPLE_CHOICE,
        GeneratedQuestionType.DATE
    ]);


    const GeneratedQuestionSchema = z.object({
        type: GeneratedQuestionTypeSchema,
        question: z.string(),
        options: z.array(z.string()).optional(),
    });

    const setPrompt = usePathwayPromptStore((state) => state.setPrompt);
    const setLanguage = usePathwayPromptStore((state) => state.setLanguage);


    const [questionLoading, setQuestionLoading] = useState<boolean>(false);

    const onSubmit = async (data: z.infer<typeof pathwayCreationSchema>) => {
        setQuestionLoading(true);
        console.log("generating questions");
        
        const questions: GeneratedQuestion[] | undefined = await generateQuestionByPrompt(data);
        
        setPrompt(data.prompt);
        setLanguage(data.language);
        
        if (questions) {
            try {
                questions.forEach((question) => {
                    GeneratedQuestionSchema.parse(question);
                })
                addQuestions(questions);
                toggleOpen(true);
            } catch (error) {
                console.error("[PathwayInputForm] Error parsing questions: " + error);
            } finally {
                setQuestionLoading(false);
            }
        } else {
            console.error("Error Creating Questions");
            setQuestionLoading(false);
        }

    }

    const {
        isLoading: languageLoading,
        data: languages,
        error: languagesError
    } = useQuery<Languages>({
        queryKey: ['languages'],
        queryFn: fetchLanguages,
    });



    const sortLanguages = (a: [string, Language], b: [string, Language]) => {
        return a[0].localeCompare(b[0]);
    }

    // const renderSpecificField = () => {
    //     switch (tab.toString()) {
    //         case PathwayCreationType.FILE.toLowerCase():
    //             return (
    //                 <FormField control={form.control} name={"file"}
    //                     render={({ field }) => (
    //                         <FormItem>
    //                             <FormLabel>Upload Files
    //                             </FormLabel>
    //                             <Input
    //                                 type="file"
    //                                 placeholder="Upload file"
    //                                 {...field} 
    //                             />
    //                             <FormDescription>
    //                                 Document should not be larger than 5MB.
    //                             </FormDescription>
    //                             <FormMessage />
    //                         </FormItem>
    //                     )} />
    //             )
    //         default: null
    //     }

    // }

    return (
        <div className="flex flex-col gap-8 w-7/12 justify-center">
            <SectionHeader title="Create a New Roadmap" description={""} />
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    {/* {renderSpecificField()} */}
                    <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enter your goal or intent</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Please describe the goal or outcome you want to achieve." {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control} name={"language"}
                        render={({ field }) => (
                            <FormItem className={"flex flex-col gap-1"}>
                                <FormLabel>Language</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    " justify-between" +
                                                    " truncate",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value
                                                    ? Object.entries(languages ?? {}).find(
                                                        ([short, language]) => language.name === field.value
                                                    )?.[1].name
                                                    : "Select language"}
                                                <ChevronsUpDown
                                                    className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-[300px] p-0">
                                        <Command>
                                            <CommandInput
                                                placeholder="Search language..." />
                                            <CommandList>
                                                <CommandEmpty>No language
                                                    found.</CommandEmpty>
                                                <CommandGroup>
                                                    {Object
                                                        .entries(languages ?? {})
                                                        .sort(sortLanguages)
                                                        .map(([short, language]) => (
                                                            <CommandItem
                                                                value={language.name}
                                                                key={language.name}
                                                                onSelect={() => {
                                                                    form.setValue("language", language.name)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        language.name === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                {language.name}
                                                                <span
                                                                    className={"text-muted-foreground ml-1"}
                                                                >
                                                                    ({language.nativeName})
                                                                </span>
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

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={questionLoading}
                        // onClick={() => {
                        //     console.log(tab);
                            
                        // }}
                    >
                        {
                            questionLoading ?
                                <div className={"flex justify-center items-center"}>
                                    <LoaderCircle className={"animate-spin mr-2"}
                                        strokeWidth={1} />
                                    Generating Questions
                                </div> :
                                <div
                                    className={"flex"}
                                >
                                    <SparklesIcon
                                        className={"w-5 h-5 mr-2"}
                                        strokeWidth={1}
                                    />
                                    Generate Roadmap
                                </div>}
                    </Button>

                </form>
            </Form>
        </div>
    )
}
