"use client";
import {cn} from "@/lib/utils";
import {useQuizCreationStore} from "@/store/QuizCreationStore";
import QuestionRenderer from "@/components/quizzes/Question/QuestionRenderer";
import {FileQuestion, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {MultipleChoiceQuestion} from "@/types/QuizTypes/MultipleChoiceQuestion";
import {TrueFalseQuestion} from "@/types/QuizTypes/TrueFalseQuestion";
import {ShortAnswerQuestion} from "@/types/QuizTypes/ShortAnswerQuestion";

export default function CreatedQuizView({className}: { className?: string }) {
    const {
        questions,
        loadQuestion,
        addedQuestion,
        removeAllQuestions,
    } = useQuizCreationStore();
    const newMultipleChoiceQuestion: MultipleChoiceQuestion = {
        questionId: "",
        questionType: "MULTIPLE_CHOICE",
        questionStatement: "",
        options: [
            {optionText: "", optionExplanation: "", correct: true},
            {optionText: "", optionExplanation: "", correct: true}
        ]
    };

    const newTrueFalseQuestion: TrueFalseQuestion = {
        questionId: "",
        questionType: "TRUE_FALSE",
        questionStatement: "",
        trueOptionExplanation: "",
        falseOptionExplanation: "",
        answer: true
    }

    const newShortAnswerQuestion: ShortAnswerQuestion = {
        questionId: "",
        questionType: "SHORT_ANSWER",
        questionStatement: "",
        answer: "",
        answerExplanation: ""
    }
    if (questions.length === 0) {
        return (
            <div className={`${cn(className)} w-full h-full`}>
                <div className={"overflow-hidden" +
                    " h-full" +
                    " flex" +
                    " flex-col" +
                    " justify-center items-center" +
                    " w-full text-center" +
                    ""}>
                    <div>
                        <FileQuestion
                            className={"w-20 h-20 mx-auto text-muted"}
                            strokeWidth={1}/>
                        <h1 className={"text-xl text-muted-foreground/20" +
                            " mt-2"}>No questions added
                            yet</h1>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className={`${cn(className)} w-full h-full`}>
            <div className={"flex flex-col gap-4 relative"}>
                <div className={"flex flex-row gap-2 justify-end"}>
                    <Button size={"sm"} variant={"ghost"}
                            onClick={removeAllQuestions} className={"flex" +
                        " flex-row gap-2 items-center"}>
                        <X className={"w-4 h-4"} strokeWidth={1}/>
                        Clear all</Button>
                </div>
                {
                    questions?.map((question, index) =>
                        <QuestionRenderer question={question} index={index}
                                          key={index}
                                          showEditingOption={true}
                                          mode={addedQuestion == question.questionId ? "Edit" : "Learning"}/>
                    )
                }
                <DropdownMenu>
                    <DropdownMenuTrigger asChild={true}>
                        <Button variant={"outline"} className={"w-full"}>Add
                            New
                            Question</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={"w-[250px]"}>
                        <DropdownMenuItem
                            onClick={() => loadQuestion(newMultipleChoiceQuestion, true)}>Multiple
                            Choice
                            Question</DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => loadQuestion(newShortAnswerQuestion, true)}>Short
                            Answer
                            Question</DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => loadQuestion(newTrueFalseQuestion, true)}>True/False
                            Question</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className={"py-16"}></div>
        </div>);
}