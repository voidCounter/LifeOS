import {Question} from "@/types/QuizTypes/Question";
import {QuizMode} from "@/types/QuizTypes/QuizMode";
import React from "react";

export interface BaseQuestionProps<T extends Question> {
    index: number,
    question: T,
    mode: QuizMode,
    showEditingOption: boolean,
    children?:React.ReactNode
}