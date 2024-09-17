"use client";
import {QuizCreationOptionType} from "@/config/QuizCreationTabsConfig";
import {useForm} from "react-hook-form";
import {
    quizCreationSchema
} from "@/app/app/quizzes/create/[tab]/QuizCreationSchema";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Button} from "@/components/ui/button";
import {
    Check,
    ChevronsUpDown,
    Circle,
    LoaderCircle,
    SparklesIcon
} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {useQuery} from "@tanstack/react-query";
import {fetchLanguages} from "@/api-handlers/quizzes";
import {Language, Languages} from "@/types/Language";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {cn} from "@/lib/utils";
import {useQuizCreationMutation} from "@/hooks/useQuizCreationQuery";
import {useQuizCreationStore} from "@/store/QuizCreationStore";
import {useEffect} from "react";
import extractVideoID from "@/utils/extractVideoID";


export default function QuizCreationForm({quizCreationMethod}: {
    quizCreationMethod: QuizCreationOptionType
}) {
    const {quizGenerating, setQuizGenerating} = useQuizCreationStore();
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
    const form = useForm<z.infer<typeof quizCreationSchema>>({
        resolver: zodResolver(quizCreationSchema),
        defaultValues: {
            articleUrl: "",
            youtubeUrl: "",
        },
    });

    form.setValue("creationMethod", quizCreationMethod.toUpperCase() as "PROMPT" | "ARTICLE" | "NOTE" | "YOUTUBE");

    const {
        mutate: generateQuiz,
        isPending: isGenerating,
        data: quiz,
        error
    } = useQuizCreationMutation(quizCreationMethod);

    async function onSubmit(data: z.infer<typeof quizCreationSchema>) {
        console.log(data);
        generateQuiz(data);
    }

    const sortLanguages = (a: [string, Language], b: [string, Language]) => {
        return a[0].localeCompare(b[0]);
    }

    const renderSpecificFields = () => {
        switch (quizCreationMethod) {
            case "note":
                return (<div>Enter notes</div>);
            case "youtube":
                return (
                    <FormField control={form.control} name={"youtubeUrl"}
                               render={({field}) => (
                                   <FormItem>
                                       <FormLabel>Youtube URL
                                       </FormLabel>
                                       <Input
                                           placeholder="Enter youtube URL"
                                           {...field}/>
                                       <FormDescription>Make sure the video
                                           is
                                           public.
                                       </FormDescription>
                                       {
                                           field.value && extractVideoID(field.value) &&
                                           <div>
                                               <iframe
                                                   src={"https://www.youtube-nocookie.com/embed/" + extractVideoID(field.value)}
                                                   className={"w-full h-64" +
                                                       " rounded-lg"}
                                                   allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                   allowFullScreen
                                                   title={"Youtube video"}/>
                                           </div>
                                       }

                                       <FormMessage/>
                                   </FormItem>
                               )}/>
                );
            case "article":
                return (
                    <FormField control={form.control} name={"articleUrl"}
                               render={({field}) => (
                                   <FormItem>
                                       <FormLabel>Article URL</FormLabel>
                                       <Input
                                           placeholder="Enter article URL"
                                           {...field}/>
                                       <FormDescription>The URL should be
                                           public
                                           and parsable.</FormDescription>
                                       <FormMessage/>
                                   </FormItem>
                               )}/>
                );
            default:
                return null;
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"flex" +
                " static" +
                " mt-8" +
                " flex-col gap-6"}>
                {renderSpecificFields()}
                <FormField control={form.control} name={"prompt"}
                           render={({field}) => (
                               <FormItem>
                                   <FormLabel>Prompt
                                   </FormLabel>
                                   <FormControl>
                                       <Textarea
                                           placeholder="Create a quiz about world world war 2."
                                           className="resize-y"
                                           {...field}
                                       />
                                   </FormControl>
                                   <FormDescription>Make your prompt
                                       descriptive
                                       to get good
                                       results!</FormDescription>
                                   <FormMessage/>
                               </FormItem>
                           )}/>
                <FormField control={form.control}
                           name={"questionsDifficulty"}
                           render={({field}) => (
                               <FormItem>
                                   <FormLabel>Questions
                                       Difficulty</FormLabel>
                                   <Select onValueChange={field.onChange}
                                           defaultValue={field.value}>
                                       <FormControl>
                                           <SelectTrigger
                                               className={"data-[placeholder]:text-muted-foreground"}>
                                               <SelectValue
                                                   placeholder={"Select" +
                                                       " questions" +
                                                       " difficulty"}/>
                                           </SelectTrigger>
                                       </FormControl>
                                       <SelectContent>
                                           <SelectItem
                                               value="EASY">Easy</SelectItem>
                                           <SelectItem
                                               value="MEDIUM">Medium</SelectItem>
                                           <SelectItem
                                               value="HARD">Hard</SelectItem>
                                           <SelectItem
                                               value="MIX">Mix</SelectItem>
                                       </SelectContent>
                                   </Select>
                                   {/*<FormDescription></FormDescription>*/}
                                   <FormMessage/>
                               </FormItem>
                           )}/>
                <FormField control={form.control} name={"questionsType"}
                           render={({field}) => (
                               <FormItem>
                                   <FormLabel>Questions Type</FormLabel>
                                   <Select onValueChange={field.onChange}
                                           defaultValue={field.value}>
                                       <FormControl>
                                           <SelectTrigger
                                               className={"data-[placeholder]:text-muted-foreground"}>
                                               <SelectValue
                                                   placeholder={"Select" +
                                                       " questions" +
                                                       " type"}/>
                                           </SelectTrigger>
                                       </FormControl>
                                       <SelectContent>
                                           <SelectItem
                                               value="MULTIPLE_CHOICE">Multiple
                                               Choice</SelectItem>
                                           <SelectItem
                                               value="TRUE_FALSE">True/False</SelectItem>
                                           <SelectItem
                                               value="SHORT_ANSWER">Short
                                               Answer</SelectItem>
                                           <SelectItem
                                               value="MIX">Mix</SelectItem>
                                       </SelectContent>
                                   </Select>
                                   {/*<FormDescription></FormDescription>*/}
                                   <FormMessage/></FormItem>
                           )}/>
                <FormField control={form.control} name={"language"}
                           render={({field}) => (
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
                                                       className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                               </Button>
                                           </FormControl>
                                       </PopoverTrigger>
                                       <PopoverContent
                                           className="w-[300px] p-0">
                                           <Command>
                                               <CommandInput
                                                   placeholder="Search language..."/>
                                               <CommandList>
                                                   <CommandEmpty>No language
                                                       found.</CommandEmpty>
                                                   <CommandGroup>
                                                       {Object.entries(languages ?? {}).sort(sortLanguages).map(([short, language]) => (
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
                                                                   className={"text-muted-foreground ml-1"}>({language.nativeName})</span>
                                                           </CommandItem>
                                                       ))}
                                                   </CommandGroup>
                                               </CommandList>
                                           </Command>
                                       </PopoverContent>
                                   </Popover>
                                   {/*<FormDescription></FormDescription>*/}
                                   <FormMessage/></FormItem>
                           )}/>
                <FormField control={form.control} name={"numberOfQuestions"}
                           render={({field}) => (
                               <FormItem>
                                   <FormLabel>Number of
                                       questions</FormLabel>
                                   <Select onValueChange={field.onChange}
                                           defaultValue={field.value}>
                                       <FormControl>
                                           <SelectTrigger
                                               className={"data-[placeholder]:text-muted-foreground"}>
                                               <SelectValue className={""}
                                                            placeholder={"Select number of questions"}/>
                                           </SelectTrigger>
                                       </FormControl>
                                       <SelectContent>
                                           {
                                               [5, 10, 15, 20].map((number) => (
                                                   <SelectItem key={number}
                                                               value={number.toString()}>{number}</SelectItem>))
                                           }
                                       </SelectContent>
                                   </Select>
                                   {/*<FormDescription></FormDescription>*/}
                                   <FormMessage/></FormItem>
                           )}/>
                <Button type="submit" disabled={isGenerating}>
                    {
                        isGenerating ?
                            <div className={"flex justify-center items-center"}>
                                <LoaderCircle className={"animate-spin mr-2"}
                                              strokeWidth={1}/>
                                Generating Quiz
                            </div> :
                            <div className={"flex"}><SparklesIcon
                                className={"w-5 h-5 mr-2"}
                                strokeWidth={1}/>
                                Generate Quiz
                            </div>
                    }
                </Button>
            </form>
        </Form>
    );
}