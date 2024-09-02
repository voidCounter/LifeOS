"use client";
import {QuizCreationOptionType} from "@/config/QuizCreationTabsConfig";
import {useForm} from "react-hook-form";
import {
    getQuizCreationSchema
} from "@/app/app/quizzes/create/[tab]/QuizCreationSchema";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl, FormDescription,
    FormField,
    FormItem,
    FormLabel, FormMessage
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Button} from "@/components/ui/button";
import {AxiosInstance} from "@/utils/AxiosInstance";


export default function QuizCreationForm(quizCreationMethod: QuizCreationOptionType) {
    const schema = getQuizCreationSchema(quizCreationMethod);
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    async function onSubmit(data: z.infer<typeof schema>) {
        try {
            const responseData = await AxiosInstance.get("/quiz/hello");
            console.log(responseData);
        } catch (error) {
            console.error("Quiz creation failed due to: ", error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name={"difficulty"}
                           render={({field}) => (
                               <FormItem>
                                   <FormLabel>Questions Difficulty</FormLabel>
                                   <Select onValueChange={field.onChange}
                                           defaultValue={field.value}>
                                       <FormControl>
                                           <SelectTrigger>
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
                <FormField control={form.control} name={"questionType"}
                           render={({field}) => (
                               <FormItem>
                                   <FormLabel>Questions Type</FormLabel>
                                   <Select onValueChange={field.onChange}
                                           defaultValue={field.value}>
                                       <FormControl>
                                           <SelectTrigger>
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
                               <FormItem>
                                   <FormLabel>Language</FormLabel>
                                   <Select onValueChange={field.onChange}
                                           defaultValue={field.value}>
                                       <FormControl>
                                           <SelectTrigger>
                                               <SelectValue
                                                   placeholder={"Select" +
                                                       " questions" +
                                                       " language"}/>
                                           </SelectTrigger>
                                       </FormControl>
                                       <SelectContent>
                                           <SelectItem
                                               value="English">English</SelectItem>
                                           <SelectItem
                                               value="Hindi">Hindi</SelectItem>
                                           <SelectItem
                                               value="Spanish">Spanish</SelectItem>
                                       </SelectContent>
                                   </Select>
                                   {/*<FormDescription></FormDescription>*/}
                                   <FormMessage/></FormItem>
                           )}/>
                <Button type="submit">Generate</Button>
            </form>
        </Form>
    );
}