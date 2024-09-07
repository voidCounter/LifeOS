"use client";
import {cn} from "@/lib/utils";
import {useQuizCreationStore} from "@/store/QuizCreationStore";
import QuestionRenderer from "@/components/quizzes/Question/QuestionRenderer";
import {FileQuestion} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {MultipleChoiceQuestion} from "@/types/QuizTypes/MultipleChoiceQuestion";
import {Question} from "@/types/QuizTypes/Question";
import {TrueFalseQuestion} from "@/types/QuizTypes/TrueFalseQuestion";
import {ShortAnswerQuestion} from "@/types/QuizTypes/ShortAnswerQuestion";

export default function CreatedQuizView({className}: { className?: string }) {
    const {questions, loadQuestion} = useQuizCreationStore();
    const newMultipleChoiceQuestion: MultipleChoiceQuestion = {
        questionType: "MULTIPLE_CHOICE",
        questionStatement: "",
        options: [
            {optionText: "", optionExplanation: "", correct: true},
            {optionText: "", optionExplanation: "", correct: true}
        ]
    };

    const newTrueFalseQuestion: TrueFalseQuestion = {
        questionType: "TRUE_FALSE",
        questionStatement: "",
        trueOptionExplanation: "",
        falseOptionExplanation: "",
        answer: true
    }

    const newShortAnswerQuestion: ShortAnswerQuestion = {
        questionType: "SHORT_ANSWER",
        questionStatement: "",
        answer: "",
        answerExplanation: ""
    }
    return (
        <div className={`${cn(className)} w-full h-full`}>
            {questions.length === 0 && <div className={"overflow-hidden" +
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
            }
            <div className={"flex flex-col gap-4 relative"}>
                {
                    questions?.map((question, index) =>
                        <QuestionRenderer question={question} index={index}
                                          key={index}
                                          showEditingOption={true}
                                          mode={question.questionStatement.length == 0 ? "Edit" : "Learning"}/>
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
                            onClick={() => loadQuestion(newMultipleChoiceQuestion)}>Multiple
                            Choice
                            Question</DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => loadQuestion(newShortAnswerQuestion)}>Short
                            Answer
                            Question</DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => loadQuestion(newTrueFalseQuestion)}>True/False
                            Question</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className={"py-52"}></div>
        </div>);
}