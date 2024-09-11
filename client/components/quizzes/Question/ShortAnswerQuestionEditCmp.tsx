"use client";
import {BaseQuestionProps} from "@/types/QuizTypes/BaseQuestionProps";
import {ShortAnswerQuestion} from "@/types/QuizTypes/ShortAnswerQuestion";
import {useQuizCreationStore} from "@/store/QuizCreationStore";
import {useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

interface ShortAnswerQuestionEditCmpProps extends BaseQuestionProps<ShortAnswerQuestion> {
}

export default function ShortAnswerQuestionEditCmp({
                                                       question,
                                                       mode,
                                                       setQuestionMode,
                                                       index
                                                   }: ShortAnswerQuestionEditCmpProps) {
    const {
        modifyQuestion,
        removeQuestion,
        addedQuestion
    } = useQuizCreationStore();
    const [currEditingQuestion, setCurrEditingQuestion] = useState(question);
    const shortAnswerQuestionFormSchema = z.object({
        questionStatement: z.string().min(5, {message: "Question statement must be at least 5 characters long"}),
        answer: z.string().min(2, {message: "Answer must be at least 2 characters long"}),
        answerExplanation: z.string().min(5, {message: "Explanation must be at least 5 characters long"}),
    });

    const form = useForm<z.infer<typeof shortAnswerQuestionFormSchema>>(
        {
            resolver: zodResolver(shortAnswerQuestionFormSchema),
            defaultValues: {
                questionStatement: question.questionStatement,
                answer: question.answer,
                answerExplanation: question.answerExplanation,
            }
        });

    const onSubmit = (data: z.infer<typeof shortAnswerQuestionFormSchema>) => {
        currEditingQuestion.questionStatement = data.questionStatement;
        currEditingQuestion.answer = data.answer;
        currEditingQuestion.answerExplanation = data.answerExplanation
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
                                <FormLabel>Answer</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder={"Question statement.."}
                                        className="resize-y"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField name={"answerExplanation"}
                               control={form.control}
                               render={({field}) => (
                                   <FormItem>
                                       <FormLabel>Explanation of the
                                           answer</FormLabel>
                                       <FormControl>
                                           <Textarea
                                               className="resize-y"
                                               {...field}
                                           />
                                       </FormControl>
                                   </FormItem>
                               )}
                    />
                    <div className={"flex flex-row gap-2"}>
                        <Button type={"submit"} size={"sm"} className={"w-fit" +
                            ""}>Save</Button>
                        <Button size={"sm"} variant={"ghost"} type={"button"}
                                onClick={() => {
                                    setQuestionMode ? setQuestionMode(mode) : null;
                                    if (addedQuestion == question.questionId) {
                                        removeQuestion(question.questionId);
                                    }
                                }}>Cancel</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}