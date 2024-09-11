import {Question} from "@/types/QuizTypes/Question";
import React, {useEffect, useRef, useState} from "react";
import {QuizMode} from "@/types/QuizTypes/QuizMode";
import {Button} from "@/components/ui/button";
import {PenIcon, Trash} from "lucide-react";
import {BaseQuestionProps} from "@/types/QuizTypes/BaseQuestionProps";
import {Card, CardContent} from "@/components/ui/card";
import {useQuizCreationStore} from "@/store/QuizCreationStore";
import {remove} from "@jridgewell/set-array";

export default function BaseQuestionCmp({
                                            index,
                                            question,
                                            mode,
                                            children,
                                            setQuestionMode,
                                            showEditingOption = false,
                                        }: BaseQuestionProps<Question>) {

    const questionRef = useRef(null);
    const {removeQuestion} = useQuizCreationStore();
    return (
        <Card
            className={`flex flex-col gap-2 w-full p-4 ${showEditingOption && "bg-secondary/50 p-2 rounded-lg"}`}
            ref={questionRef}>
            <CardContent className={"p-0 w-full"}>
                <div className={"flex flex-row gap-2 w-full"}>
                <span className={"flex rounded-md justify-center items-center" +
                    " w-7 h-7 text-sm" +
                    "  border-border" +
                    " align-middle " +
                    " border"}>{index + 1}</span>
                    {/* Options */}
                    <div className={"flex flex-col gap-2 mt-0.5 w-full"}>
                        <h3 className={"font-medium mb-3"}>{question?.questionStatement}</h3>
                        {children}
                    </div>
                </div>
                {
                    showEditingOption &&
                    <div className={"flex flex-row gap-2 w-full justify-end"}>
                        {/* delete quiz */}
                        <Button variant={"ghost"} size={"icon"}
                                className={"hover:bg-destructive/20" +
                                    " active:bg-destructive/30"}
                                onClick={() => removeQuestion(question.questionId)}>
                            <Trash className={"w-4 h-4"} strokeWidth={1.5}/>
                        </Button>
                        {/* Edit quiz */}
                        <Button variant={"outline"} size={"icon"}
                                onClick={() => setQuestionMode ? setQuestionMode("Edit") : null}>
                            <PenIcon className={"w-4 h-4"} strokeWidth={1.5}/>
                        </Button>
                    </div>
                }
            </CardContent>
        </Card>
    );
}