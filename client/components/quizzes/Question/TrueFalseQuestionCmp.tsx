import {TrueFalseQuestion} from "@/types/QuizTypes/TrueFalseQuestion";
import BaseQuestionCmp from "./BaseQuestionCmp";
import {BaseQuestionProps} from "@/types/QuizTypes/BaseQuestionProps";
import QuestionOption from "./QuestionOption";

interface TrueFalseQuestionCmpProps extends BaseQuestionProps<TrueFalseQuestion> {
}


export default function TrueFalseQuestionCmp({
                                                 question,
                                                 mode,
                                                 index,
                                                 showEditingOption
                                             }: TrueFalseQuestionCmpProps) {

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

    return (
        <BaseQuestionCmp index={index} question={question} mode={mode}
                         showEditingOption={showEditingOption}>
            {
                trueFalseQuestionOptions.map((option) => {
                    return (
                        <div
                            key={option.optionText}>
                            <QuestionOption option={option.optionText}
                                            optionExplanation={option.optionExplanation}
                                            isCorrect={option.isCorrect}
                                            mode={mode}/>
                        </div>)
                })
            }
        </BaseQuestionCmp>
    );
}