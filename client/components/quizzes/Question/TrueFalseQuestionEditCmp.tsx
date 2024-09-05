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

interface TrueFalseQuestionEditCmpProps extends BaseQuestionProps<TrueFalseQuestion> {
}

export default function TrueFalseQuestionEditCmp({
                                                     question,
                                                     mode,
                                                     setQuestionMode,
                                                     index
                                                 }: TrueFalseQuestionEditCmpProps) {


    const [currEditingQuestion, setCurrEditingQuestion] = useState(question);
    const multipleChoiceQuestionFormSchema = z.object({
        questionStatement: z.string(),
        trueOptionExplanation: z.string(),
        falseOptionExplanation: z.string(),
        answer: z.boolean()
    });

    const form = useForm<z.infer<typeof multipleChoiceQuestionFormSchema>>(
        {
            resolver: zodResolver(multipleChoiceQuestionFormSchema),
            defaultValues: {
                questionStatement: question.questionStatement,
                trueOptionExplanation: question.trueOptionExplanation,
                falseOptionExplanation: question.falseOptionExplanation,
                answer: question.answer
            }
        });

    const onSubmit = (data: z.infer<typeof multipleChoiceQuestionFormSchema>) => {
        currEditingQuestion.questionStatement = data.questionStatement;
        currEditingQuestion.trueOptionExplanation = data.trueOptionExplanation;
        currEditingQuestion.falseOptionExplanation = data.falseOptionExplanation;
        currEditingQuestion.answer = data.answer;
        setCurrEditingQuestion(currEditingQuestion);
        // setQuestionMode("View");
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
                                <FormLabel>Answer</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem
                                            className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="true"/>
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
                                <FormDescription>Choose True if the statement is
                                    true, otherwise choose
                                    False.</FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField name={"trueOptionExplanation"}
                               control={form.control}
                               render={({field}) => (
                                   <FormItem>
                                       <FormLabel>Explanation for True
                                           Option</FormLabel>
                                       <FormControl>
                                           <Textarea
                                               className="resize-y"
                                               {...field}
                                           />
                                       </FormControl>
                                       <FormDescription>
                                           When the statement is true, provide
                                           the reasoning or logic that supports
                                           why the statement is true. Also,
                                           explain why the statement cannot be
                                           false.
                                       </FormDescription>
                                   </FormItem>
                               )}
                    />
                    <FormField name={"falseOptionExplanation"}
                               control={form.control}
                               render={({field}) => (
                                   <FormItem>
                                       <FormLabel>Explanation for False
                                           Option</FormLabel>
                                       <FormControl>
                                           <Textarea
                                               className="resize-y"
                                               {...field}
                                           />
                                       </FormControl>
                                       <FormDescription>
                                           When the statement is false, provide
                                           the reasoning or logic that explains
                                           why the statement is false.
                                           Additionally, include an explanation
                                           of why the statement cannot be true."
                                       </FormDescription>
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
