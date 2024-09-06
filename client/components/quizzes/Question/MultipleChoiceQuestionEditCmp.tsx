import {BaseQuestionProps} from "@/types/QuizTypes/BaseQuestionProps";
import {MultipleChoiceQuestion} from "@/types/QuizTypes/MultipleChoiceQuestion";
import {z} from "zod";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel, FormMessage
} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {PlusIcon, XIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {useState} from "react";
import {useQuizCreationStore} from "@/store/QuizCreationStore";

interface MultipleChoiceQuestionEditCmpProps extends BaseQuestionProps<MultipleChoiceQuestion> {
}

export default function MultipleChoiceQuestionEditCmp({
                                                          question,
                                                          mode,
                                                          setQuestionMode,
                                                          index
                                                      }: MultipleChoiceQuestionEditCmpProps) {

    const {modifyQuestion} = useQuizCreationStore();

    const [currEditingQuestion, setCurrEditingQuestion] = useState(question);
    const multipleChoiceQuestionFormSchema = z.object({
        questionStatement: z.string().min(5, {message: "Question statement must be at least 5 characters long"}),
        options: z.array(z.object({
            optionText: z.string().min(2, {
                message: "Option text must be at" +
                    " least 2 characters long"
            }),
            optionExplanation: z.string().min(5, {message: "Explanation must be at least 5 characters long"}),
            correct: z.boolean()
        })).min(2, {message: "There must be at least 2 options"})
    });

    const form = useForm<z.infer<typeof multipleChoiceQuestionFormSchema>>(
        {
            resolver: zodResolver(multipleChoiceQuestionFormSchema),
            defaultValues: {
                questionStatement: question.questionStatement,
                options: question.options
            }
        });

    const {fields: optionFields, append, remove} = useFieldArray({
        name: "options",
        control: form.control
    });

    const onSubmit = (data: z.infer<typeof multipleChoiceQuestionFormSchema>) => {
        currEditingQuestion.questionStatement = data.questionStatement;
        currEditingQuestion.options = data.options.map((option, index) => {
            return {...option, optionId: index.toString()};
        });
        modifyQuestion(currEditingQuestion);
        if (setQuestionMode) {
            setQuestionMode(mode);
        }
    }

    return (
        <div className={"p-2 rounded-lg border"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className={"flex w-full flex-col gap-2"}>
                    <FormField name={"questionStatement"} control={form.control}
                               render={({field}) => (
                                   <FormItem>
                                       <FormControl>
                                           <Textarea
                                               className="resize-y"
                                               {...field}
                                           />
                                       </FormControl>
                                       <FormMessage/>
                                   </FormItem>
                               )}
                    />
                    {
                        optionFields.map((option, index) => (
                            // TODO: Show error message for option number < 2
                            <div key={option.id}
                                 className={"flex flex-col gap-4 p-4 pt-8" +
                                     " bg-secondary/50 rounded-lg border" +
                                     " relative"}>
                                <div className={"w-full flex justify-end" +
                                    " absolute top-0 left-0 p-2"}>
                                    <Button size={"sm"} type={"button"}
                                            onClick={() => remove(index)}
                                            variant={"ghost"}
                                            className={"w-fit"}>
                                        <XIcon className={"w-5 h-5"}
                                               strokeWidth={1}/>
                                    </Button>
                                </div>
                                <FormField
                                    name={`options.${index}.optionText`}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Option {index + 1}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name={`options.${index}.optionExplanation`}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Explanation</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    className="resize-y"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField name={`options.${index}.correct`}
                                           control={form.control}
                                           render={({field}) => (
                                               <FormItem
                                                   className={"flex" +
                                                       " flex-row items-start space-x-2 space-y-0 rounded-md"}>
                                                   <FormControl>
                                                       <Checkbox
                                                           checked={field.value}
                                                           onCheckedChange={field.onChange}
                                                       />
                                                   </FormControl>
                                                   <FormLabel>Correct</FormLabel>
                                                   <FormMessage/>
                                               </FormItem>
                                           )}
                                />
                            </div>
                        ))
                    }
                    <Button size={"sm"} variant={"outline"} type={"button"}
                            onClick={(e) => {
                                e.defaultPrevented;
                                append({
                                    optionText: "",
                                    optionExplanation: "",
                                    correct: false
                                })
                            }}>
                        <PlusIcon className={"w-5 h-5 mr-2"}
                                  strokeWidth={1}></PlusIcon>
                        Add option</Button>
                    <div className={"flex flex-row gap-2"}>
                        <Button type={"submit"} size={"sm"} className={"w-fit" +
                            ""}>Save</Button>
                        <Button size={"sm"} variant={"ghost"} type={"button"}
                                onClick={() => setQuestionMode ? setQuestionMode(mode) : null}>Cancel</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
        ;
}