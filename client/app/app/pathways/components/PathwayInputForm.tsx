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
import { Check, ChevronsUpDown, FileQuestion, Info, SparklesIcon } from "lucide-react"
import SectionHeader from "@/components/SectionHeader"
import { Select } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useQuery } from "@tanstack/react-query"
import { Language, Languages } from "@/types/Language"
import { fetchLanguages } from "@/api-handlers/language"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { AxiosInstance } from "@/utils/AxiosInstance"
import { generatePathwayByPrompt } from "@/api-handlers/pathway"
import { log } from "console"
import { GeneratedQuestionType } from "@/types/PathwayTypes"

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_FILE_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "application/vnd.ms-powerpoint"
]

const FormSchema = z.object({
    prompt: z.string().min(15, {
        message: "Prompt must be at least 15 characters long",
    }).max(200, {
        message: "Prompt must not exceed 200 characters",
    }),
    language: z.string().optional().default("English"),
})


export function PathwayInputForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            prompt: "",
        },
    })

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


    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(data);
        const returnedString = await generatePathwayByPrompt(data);
        const parsedData = await JSON.parse(returnedString);
        try {
            const validatedQuestion = GeneratedQuestionSchema.parse(parsedData);
            console.log(validatedQuestion);
        } catch (error) {
            console.log("[PathwayInputForm.tsx] Error parsing pathway data," + error);
            
        }
        
    }
    const fetchPathway = async (prompt: string, language: string): Promise<string> => {
        return generatePathwayByPrompt({ prompt, language });
    };
    const {
        isLoading: languageLoading,
        data: languages,
        error: languagesError
    } = useQuery<Languages>({
        queryKey: ['languages'],
        queryFn: fetchLanguages,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
    


    const sortLanguages = (a: [string, Language], b: [string, Language]) => {
        return a[0].localeCompare(b[0]);
    }



    return (
        <div className="flex flex-col gap-8 w-7/12 justify-center">
            <SectionHeader title="Create a New Roadmap" description={""} />
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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

                    {/* File Upload, drag and drop */}

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
                    >
                        <div
                            className={"flex"}
                        >
                            <SparklesIcon
                                className={"w-5 h-5 mr-2"}
                                strokeWidth={1}
                            />
                            Generate Roadmap
                        </div>
                    </Button>

                </form>
            </Form>
        </div>
    )
}
