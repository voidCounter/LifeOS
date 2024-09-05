import {TrueFalseQuestion} from "@/types/QuizTypes/TrueFalseQuestion";
import BaseQuestionCmp from "./BaseQuestionCmp";
import {BaseQuestionProps} from "@/types/QuizTypes/BaseQuestionProps";
import QuestionOption from "./QuestionOption";
import {useState} from "react";
import {QuizMode} from "@/types/QuizTypes/QuizMode";
import TrueFalseQuestionEditCmp
    from "@/components/quizzes/Question/TrueFalseQuestionEditCmp";

interface TrueFalseQuestionCmpProps extends BaseQuestionProps<TrueFalseQuestion> {
}


export default function TrueFalseQuestionCmp({
                                                 question,
                                                 mode,
                                                 index,
                                                 showEditingOption,
                                             }: TrueFalseQuestionCmpProps) {

    const [questionMode, setQuestionMode] = useState(mode);

    const trueFalseQuestionOptions = [
        {
            optionText: "True",
            optionExplanation: question.trueOptionExplanation,
            isCorrect: true == question.answer
        },
        {
            optionText: "False",
            optionExplanation: question.falseOptionExplanation,
            isCorrect: false == question.answer

        }
    ];
    if (questionMode === "Edit") {
        return <TrueFalseQuestionEditCmp index={index} question={question}
                                         mode={mode}
                                         showEditingOption={showEditingOption}/>;
    }

    return (
        <BaseQuestionCmp index={index} question={question} mode={questionMode}
                         showEditingOption={showEditingOption}
                         setQuestionMode={(mode: QuizMode) => setQuestionMode(mode)}>
            {
                trueFalseQuestionOptions.map((option) => {
                    return (
                        <QuestionOption
                            key={question.questionId + option.optionText}
                            id={question.questionId + option.optionText}
                            option={option.optionText}
                            optionExplanation={option.optionExplanation}
                            isCorrect={option.isCorrect}
                            mode={questionMode}/>)
                })
            }
        </BaseQuestionCmp>
    );
}