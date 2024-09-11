"use client";
import {z} from "zod";
import {useForm} from "react-hook-form";
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
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Switch} from "@/components/ui/switch";
import {useQuizCreationStore} from "@/store/QuizCreationStore";
import {SelectTagInput} from "@/components/ui/SelectTagInput";
import {useState} from "react";
import {InputTags} from "@/components/ui/InputTags";
import {useMutation, useQuery} from "@tanstack/react-query";
import {
    createdQuizResponse,
    fetchLanguages,
    saveQuiz
} from "@/api-handlers/quizzes";
import {Check, ChevronsUpDown, LoaderCircle} from "lucide-react";
import {useRouter} from "next/navigation";
import {Language, Languages} from "@/types/Language";
import {
    quizCreationSchema
} from "@/app/app/quizzes/create/[tab]/QuizCreationSchema";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {
    Command,
    CommandEmpty, CommandGroup,
    CommandInput, CommandItem,
    CommandList
} from "@/components/ui/command";

export default function SaveQuizForm() {
    const router = useRouter();
    const {questions, removeAllQuestions} = useQuizCreationStore();
    const saveQuizFormSchema = z.object({
        quizTitle: z.string().min(2, {message: "Quiz title must be at least 2 characters long"}),
        quizDescription: z.string().min(10, {message: "Quiz description must be at least 10 characters long"}),
        published: z.boolean().default(false),
        language: z.string(),
        categories: z.array(z.string().min(2, {
            message: "Category must be at least" +
                " 2 characters long"
        })).min(1, {message: "At least one category must be selected"}),
    }).transform((data) => {
        return {
            ...data,
            questions: questions
        }
    })

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


    const {mutate: saveQuizIntoDB, isPending} = useMutation({
        mutationFn: (data: any): Promise<createdQuizResponse> => {
            return saveQuiz(data);
        },
        onSuccess: (response) => {
            console.log("Successfully added the quiz: ", response);
            // removing all saved questions after saving the quiz.
            removeAllQuestions();
            router.push(`/app/quizzes/quiz/${response.quizId}`);
        },
        onError: (error) => {
            console.log("Failed to save quiz: ", error);
        }
    })


    const form = useForm<z.infer<typeof saveQuizFormSchema>>(
        {
            resolver: zodResolver(saveQuizFormSchema),
            defaultValues: {
                quizTitle: "",
                quizDescription: "",
                published: false,
                categories: []
            }
        });

    const onSubmit = (data: z.infer<typeof saveQuizFormSchema>) => {
        console.log("Saving quiz: ", data);
        saveQuizIntoDB(data);
    }

    return (
        <div className={"flex flex-col w-full"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className={"flex w-full flex-col gap-4"}>
                    <FormField name={"quizTitle"} control={form.control}
                               render={({field}) => (
                                   <FormItem>
                                       <FormLabel>Quiz title</FormLabel>
                                       <FormControl>
                                           <Input {...field}
                                                  placeholder={"Quiz title"}/>
                                       </FormControl>
                                       <FormMessage/>
                                   </FormItem>
                               )}/>
                    <FormField name={"quizDescription"} control={form.control}
                               render={({field}) => (
                                   <FormItem>
                                       <FormLabel>Quiz description</FormLabel>
                                       <FormControl>
                                           <Textarea {...field}
                                                     placeholder={"Quiz description"}/>
                                       </FormControl>
                                       <FormMessage/>
                                   </FormItem>
                               )}/>
                    <FormField
                        control={form.control}
                        name="categories"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Quiz Category</FormLabel>
                                <FormControl>
                                    <InputTags value={field.value}
                                               onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
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
                    <FormField name={"published"} control={form.control}
                               render={({field}) => (
                                   <FormItem
                                       className={"flex flex-row p-3 border" +
                                           " rounded-lg" +
                                           " justify-between items-center"}>
                                       <div className={"flex flex-col gap-2"}>
                                           <FormLabel>Publish the
                                               quiz</FormLabel>
                                           <FormDescription>Users across the app
                                               will
                                               be able to see your
                                               quiz.</FormDescription>
                                       </div>
                                       <FormControl>
                                           <Switch checked={field.value}
                                                   className={"-z-0"}
                                                   onCheckedChange={field.onChange}
                                           ></Switch>
                                       </FormControl>
                                   </FormItem>
                               )}/>
                    <Button type={"submit"}>
                        {
                            isPending ? <div className={"flex flex-row gap-2" +
                                " items-center"}>
                                <LoaderCircle className={"animate-spin mr-2"}
                                              strokeWidth={1}/>
                                Saving Quiz</div> : "Save quiz"
                        }
                    </Button>
                </form>
            </Form></div>
    );
}