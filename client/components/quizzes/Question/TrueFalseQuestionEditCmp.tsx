"use client";
import {BaseQuestionProps} from "@/types/QuizTypes/BaseQuestionProps";
import {MultipleChoiceQuestion} from "@/types/QuizTypes/MultipleChoiceQuestion";
import {TrueFalseQuestion} from "@/types/QuizTypes/TrueFalseQuestion";
import {useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl, FormDescription,
    FormField,
    FormItem,
    FormLabel, FormMessage
} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {Checkbox} from "@/components/ui/checkbox";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Button} from "@/components/ui/button";
import {useQuizCreationStore} from "@/store/QuizCreationStore";

interface TrueFalseQuestionEditCmpProps extends BaseQuestionProps<TrueFalseQuestion> {
}

export default function TrueFalseQuestionEditCmp({
                                                     question,
                                                     mode,
                                                     setQuestionMode,
                                                     index
                                                 }: TrueFalseQuestionEditCmpProps) {
    const {modifyQuestion} = useQuizCreationStore();
    const [currEditingQuestion, setCurrEditingQuestion] = useState(question);
    const [selectedCorrectOption, setSelectedCorrectOption] = useState(question.answer);
    const trueFalseQuestionFormSchema = z.object({
        questionStatement: z.string().min(5, {message: "Question statement must be at least 5 characters long"}),
        trueOptionExplanation: z.string().min(5, {message: "Explanation must be at least 5 characters long"}),
        falseOptionExplanation: z.string().min(5, {message: "Explanation must be at least 5 characters long"}),
        answer: z.boolean()
    });

    const form = useForm<z.infer<typeof trueFalseQuestionFormSchema>>(
        {
            resolver: zodResolver(trueFalseQuestionFormSchema),
            defaultValues: {
                questionStatement: question.questionStatement,
                trueOptionExplanation: question.trueOptionExplanation,
                falseOptionExplanation: question.falseOptionExplanation,
                answer: question.answer
            }
        });

    const onSubmit = (data: z.infer<typeof trueFalseQuestionFormSchema>) => {
        currEditingQuestion.questionStatement = data.questionStatement;
        currEditingQuestion.trueOptionExplanation = data.trueOptionExplanation;
        currEditingQuestion.falseOptionExplanation = data.falseOptionExplanation;
        currEditingQuestion.answer = data.answer;
        setCurrEditingQuestion(currEditingQuestion);
        modifyQuestion(currEditingQuestion);
        if (setQuestionMode) {
            setQuestionMode(mode);
        }
    }
    return (
        <div className={"p-4 rounded-lg border"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className={"flex w-full flex-col gap-4"}>
                    <FormField name={"questionStatement"} control={form.control}
                               render={({field}) => (
                                   <FormItem>
                                       <FormLabel>Question statement</FormLabel>
                                       <FormControl>
                                           <Textarea
                                               className="resize-y"
                                               {...field}
                                           />
                                       </FormControl>
                                   </FormItem>
                               )}
                    />

                    <FormField
                        control={form.control}
                        name="answer"
                        render={({field}) => (
                            <FormItem className="space-y-3">
                                <FormLabel>The statement is - </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        defaultValue={field.value.toString()}
                                        onValueChange={(value) => {
                                            field.onChange(value === "true");
                                            setSelectedCorrectOption(value === "true");
                                            console.log(value);
                                        }}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem
                                            className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="true"
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                True
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem
                                            className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem
                                                    value="false"/>
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                False
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField name={"trueOptionExplanation"}
                               control={form.control}
                               render={({field}) => (
                                   <FormItem>
                                       <FormLabel>{
                                           selectedCorrectOption ? "The statement is" +
                                               " true because -" : "The" +
                                               " statement is not true" +
                                               " because -"
                                       }</FormLabel>
                                       <FormControl>
                                           <Textarea
                                               className="resize-y"
                                               {...field}
                                           />
                                       </FormControl>
                                       <FormDescription>This is the explanation
                                           a user see when they select the true
                                           option.</FormDescription>
                                   </FormItem>
                               )}
                    />
                    <FormField name={"falseOptionExplanation"}
                               control={form.control}
                               render={({field}) => (
                                   <FormItem>
                                       <FormLabel>{
                                           selectedCorrectOption ? "The" +
                                               " statement is not" +
                                               " false because" +
                                               " -" : "The" +
                                               " statement is false because -"
                                       }</FormLabel>
                                       <FormControl>
                                           <Textarea
                                               className="resize-y"
                                               {...field}
                                           />
                                       </FormControl>
                                       <FormDescription>This is the explanation
                                           a user see when they select the false
                                           option.</FormDescription>
                                   </FormItem>
                               )}
                    />

                    <div className={"flex flex-row gap-2"}>
                        <Button type={"submit"} size={"sm"} className={"w-fit" +
                            ""}>Save</Button>
                        <Button size={"sm"} variant={"ghost"} type={"button"}
                                onClick={() => setQuestionMode ? setQuestionMode(mode) : null}>Cancel</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
