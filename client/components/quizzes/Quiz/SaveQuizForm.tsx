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
import {useMutation} from "@tanstack/react-query";
import {createdQuizResponse, saveQuiz} from "@/api-handlers/quizzes";
import {LoaderCircle} from "lucide-react";
import {useRouter} from "next/navigation";

export default function SaveQuizForm() {
    const router = useRouter();
    const {questions} = useQuizCreationStore();
    const saveQuizFormSchema = z.object({
        quizTitle: z.string().min(2, {message: "Quiz title must be at least 2 characters long"}),
        quizDescription: z.string().min(10, {message: "Quiz description must be at least 10 characters long"}),
        published: z.boolean().default(false),
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

    const {mutate: saveQuizIntoDB, isPending} = useMutation({
        mutationFn: (data: any): Promise<createdQuizResponse> => {
            return saveQuiz(data);
        },
        onSuccess: (response) => {
            console.log("Successfully added the quiz: ", response);
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